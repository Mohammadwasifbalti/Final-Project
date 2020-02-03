import  firebase,{ db } from '../../firebase';

export const isStatus = ()=>{
    console.log('running')
        return dispatch => {
            firebase.auth().onAuthStateChanged(user=>{
                if(user)
                {
                    dispatch({type: 'authChanged', payload: user})
                    console.log(user)
                    console.log(user.email);
                    let profilePic = db.collection('User').doc(user.email);
                    profilePic.get().then((data)=>{
                        if(data){
                          console.log(data.data());
                            dispatch({type: 'dataFromFirestore', payload: data.data()})
                        }
                        else
                        dispatch({type: 'dataFromFirestore', payload: {name: '', email: '', pic: ''}})
                        let Listings = [];
                        profilePic.collection('Your Listings').get().then((querySnapshot)=>{
                          let len = querySnapshot.docs.length;
                          querySnapshot.forEach((data)=>{  
                            db.collection('Hostings').doc(data.data().id)
                              .get().then((data)=>{
                                  Listings.push(data.data());
                                  dispatch({type: 'addListing', payload: Listings});
                        })
                    })
                    if(len === 0)
                    {
                        dispatch({type: 'addListing', payload: Listings});
                    }
                })
                })
                }
                else
                {
                  dispatch({type: 'authChanged', payload: false})
                  dispatch({type: 'dataFromFirestore', payload: {name: 'Loading...', email: 'Loading...', pic: 'https://firebasestorage.googleapis.com/v0/b/final-project-1ebcd.appspot.com/o/default%2Fblack.jpg?alt=media&token=121434bd-8c49-44aa-96d9-f5cd53ecc745'}})
                }  
                let StayListings = []
                db.collection('Hostings').get().then((querySnapshot)=>{
                  let length = querySnapshot.docs.length;
                  querySnapshot.forEach((data)=>{
                    db.collection('Hostings').doc(data.data().id)
                    .get().then((items)=>{
                      let tempdata = items.data();
                      db.collection('User').doc(items.data().postedBy).get().then((author)=>{
                        tempdata.authorPic = author.data().pic;
                        tempdata.authorName = author.data().name;                        
                        console.log(tempdata)
                        StayListings.push(tempdata);
                        dispatch({type: 'stays', payload: StayListings})
                      });
                    })
                  })
                  if(length === 0){
                    dispatch({type: 'stays', payload: StayListings});
                  }
                })
            })
        }
    }
    
   export const Logout = ()=> dispatch=>{
       firebase.auth().signOut().then(()=>{
            dispatch({type:'addListing', payload: false})
           isStatus()
       })
   }

export const DeleteListings = (email,id,city,state,listings,index)=>{
  listings = listings.filter((items,indexes)=>indexes !== Number(index));
  return dispatch =>{
  db.collection('Hostings').doc(id).delete().then(()=>{
    db.collection('User').doc(email).collection('Your Listings').doc(id).delete().then(()=>{
        db.collection(city).doc(id).delete().then(()=>{
            db.collection(state).doc(id).delete().then(()=>{
              dispatch({type: 'addListing', payload: listings});
              dispatch({type: 'updatedListing', payload: 'deletedListings'});
            })
        })
    })
  })
  .catch((e)=>{
      console.log(e.message)
  });   
}
}

export const UpdateListings = (listings,index, id, address, city, province, guests, beds, rooms, rent) =>{ 
  listings[index] = {...listings[index], ...{ address: address.toLowerCase(), city: city.toLowerCase(), state: province.toLowerCase(), beds: beds, rooms: rooms, guests: guests, rent: rent}};
  console.log(listings)
  console.log(index)
  console.log(id)
  return dispatch => {
  db.collection('Hostings').doc(id).update({ address: address.toLowerCase(), city: city.toLowerCase(), state: province.toLowerCase(), beds: beds, rooms: rooms, guests: guests, rent: rent})
  .then((data)=>{
    console.log(data)
    dispatch({type: 'updatedListing', payload: 'updatedListing'});
    dispatch({type: 'addListing', payload: listings});
      })
      .catch((e)=>{
        console.log(e)
      })
    }
}

export const SignUp = (email,name,pass,pic) => dispatch =>
{
    dispatch({type: 'signUpStatus', payload: 'process'})
    dispatch({type: 'dataFromFirestore', payload: {name: name, email: email, pic: 'https://firebasestorage.googleapis.com/v0/b/final-project-1ebcd.appspot.com/o/default%2Fblack.jpg?alt=media&token=121434bd-8c49-44aa-96d9-f5cd53ecc745'}});
    let promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
        promise.then(()=>{
            let date = Date.now();
            let uploadImage = firebase.storage().ref().child('profiles/' + date)
            uploadImage.put(pic)
        .then(()=>{
            uploadImage.getDownloadURL().then((url)=>{
            let newUser = db.collection('User').doc(email);
            newUser.set({name: name, email: email, pic: url }).then(()=>{
              dispatch({type: 'signUpStatus', payload: 'Success'})
            })
        })
    })
    })
        .catch(e=>{
            let temp = e.code;
            temp = temp.slice(5);
            dispatch({type: 'signUpStatus', payload: temp})
            console.log(temp)
        });
}

export const signIn = (email,pass) => dispatch =>
{

  let promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  promise.catch(e => {
      let temp = e.code;
      temp = temp.slice(5)
      dispatch({type: 'signInStatus', payload: temp})
    });
  promise.then(() => {
      firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            dispatch({type: 'signInStatus', payload: false})
            dispatch({type: 'authChanged', payload: firebaseUser})
              console.log(firebaseUser)
          }
          else {
              console.log("Not logged in")
          }
      });
  })
}

export const HostHome = (address, city, state, rooms, beds, rent, guest,  pic, props) => dispatch=>
{

    let tempurl= []
    pic.map((items)=>{
        let id = Date.now();
        let uploadImage = firebase.storage().ref().child('hostings/'+id)
        return(
        uploadImage.put(items)
        .then(()=>{
            uploadImage.getDownloadURL()
            .then((url)=>{
                tempurl.push(url);
                if(tempurl.length === pic.length)
                {
                  let id = Date.now();
                  let currentDate = new Date();
                  db.collection('Hostings').doc(id.toString()).set({id: id.toString(), pic: tempurl, address: address.toLowerCase(), city: city.toLowerCase(), state: state.toLowerCase(), beds: beds, rooms: rooms, guests: guest, rent: rent, postedOn: currentDate.toString(), postedBy: props.user.email})
                  .then(()=>{
                    db.collection('User').doc(props.user.email).collection('Your Listings').doc(id.toString()).set({id: id.toString(), postedOn: currentDate})
                    .then(()=>{
                      db.collection(city.toLowerCase()).doc(id.toString()).set({id: id.toString()})
                      .then(()=>{
                        db.collection(state.toLowerCase()).doc(id.toString()).set({id: id.toString()})
                        .then(()=>{
                          let tempo = props.Listings;
                          tempo.push({id: id.toString(), pic: tempurl, address: address.toLowerCase(), city: city.toLowerCase(), state: state.toLowerCase(), beds: beds, rooms: rooms, guests: guest, rent: rent, postedOn: currentDate.toString(), postedBy: props.user.email})
                          dispatch({type: 'addListing', payload: tempo})
                          let tempStays = props.stays;
                          db.collection('User').doc(props.user.email).get()
                          .then((author)=>{
                            tempStays.push({id: id.toString(), pic: tempurl, address: address.toLowerCase(), city: city.toLowerCase(), state: state.toLowerCase(), beds: beds, rooms: rooms, guests: guest, rent: rent, postedOn: currentDate.toString(), authorPic: author.data().pic, authorName: author.data().name, postedBy: props.user.email})
                            dispatch({type: 'stays', payload: tempStays})
                            dispatch({type: 'hostingStatus', payload: 'hostingSuccess'})
                          })
                          .catch((err)=>
                          dispatch({type: 'hostingStatus', payload: err}))
                        })
                        .catch((err)=>
                          dispatch({type: 'hostingStatus', payload: err})
                        )
                      })
                      .catch((err)=>
                        dispatch({type: 'hostingStatus', payload: err})
                      )
                    })
                    .catch((err)=>
                      dispatch({type: 'hostingStatus', payload: err})
                    )
                  })
                  .catch((err)=>
                    dispatch({type: 'hostingStatus', payload: err})
                  )
                }
            })
            .catch((err)=>
              dispatch({type: 'hostingStatus', payload: err})
            )
        })
        .catch((err)=>
          dispatch({type: 'hostingStatus', payload: err})
        )
        )
    })
  }
