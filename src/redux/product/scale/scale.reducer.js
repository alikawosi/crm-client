import * as actionType from './scale.action';

const initialState = {
    scaleList: [],
    scaleFullPathList: [],
    scaleFullPathByIdList:[],
    scaleItem: [],
    //---------------
    message: '',

};

export const scaleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_SCALE:
            return {
                ...state,
                scaleList: action.result.scaleList
            };
        case actionType.GET_SCALEFULLPATH:
            return {
                ...state,
                scaleFullPathList: action.result.scaleFullPathList
            };
        case actionType.GET_SCALEFULLPATHBYID:
            return {
                ...state,
                scaleFullPathByIdList: action.result.scaleFullPathByIdList
            };
        case actionType.POST_SCALE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_SCALE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_SCALEITEM:
            return {
                ...state,
                scaleItem: action.result.scaleItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_SCALE:
            return {
                ...state,
                message: action.result.updatedMessage,
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };

        default:
            return state;
    }
}