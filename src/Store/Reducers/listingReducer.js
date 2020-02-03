const initialState = {
    listing: false,
    updateMenu: null,
    updatedListing: false
}
const listingReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'addListing':
            console.log("listings added")
            return{
                ...state,
                listing: action.payload,
                updateMenu: Date.now()
            }
        case 'updatedListing':
            console.log("listings updated")
            return{
                ...state,
                updatedListing: action.payload
            }
        default:
            return{
                ...state
            }
        }
    }

export default listingReducer;