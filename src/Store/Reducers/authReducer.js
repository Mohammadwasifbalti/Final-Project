const initialState = {
    auth: 'notloaded',
    data: {name: 'Loading...', email: 'Loading...', pic: 'https://firebasestorage.googleapis.com/v0/b/final-project-1ebcd.appspot.com/o/default%2Fblack.jpg?alt=media&token=121434bd-8c49-44aa-96d9-f5cd53ecc745'},
    temp: true,
    page: false,
    signUpStatus: false,
    signInStatus: false
}
const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'authChanged':
            return{
                ...state,
                auth: action.payload
            }
        case 'dataFromFirestore':
            console.log(action.payload)
            return{
                ...state,
                data: action.payload,
            }
        case 'temporary':
            return{
                ...state,
                temp : action.payload
            }
        case 'pages':
            console.log(action.payload)
            return{
                ...state,
                page: action.payload
            }
        case 'signUpStatus':
            console.log(action.payload)
            return{
                ...state,
                signUpStatus: action.payload
            }
        case 'signInStatus':
            console.log(action.payload)
            return{
                ...state,
                signInStatus: action.payload
            }    
        default:
            return{
                ...state
            }

        }
    }

    export default authReducer;