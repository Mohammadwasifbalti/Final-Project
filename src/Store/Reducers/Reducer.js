const initialState = {
    updateMenu: null,
    stays: false,
    searching: false,
    hostingStatus: false
}

const Reducer = (state = initialState, action)=>{
        switch(action.type){

            case 'stays':
                console.log("stays")
                return{
                    ...state,
                    stays: action.payload,
                    updateMenu: Date.now()
                }
            case 'searching':
                return{
                    ...state,
                    searching: action.payload
                }
            case 'hostingStatus':
                return{
                    ...state,
                    hostingStatus: action.payload
                }    
            default:
                return state;
        }
}
export default Reducer;