import * as actionType from './position.action';

const initialState = {

    positionList:[],

    positionCategoryTitleList:[],
    positionFullPathList:[],

    positionItem:[],    
    positionFullPathByIdList:[],

    message: '',

};

export const positionReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_POSITION:
            return {
                ...state,
                positionList: action.result.positionList
            };
        case actionType.GET_POSITIONFORMDATA:
            return {
                ...state,
                positionCategoryTitleList: action.result.positionCategoryTitleList,
                positionFullPathList: action.result.positionFullPathList
            };
        case actionType.GET_POSITIONITEM:
            return {
                ...state,
                positionItem: action.result.positionItem,
                positionFullPathByIdList: action.result.positionFullPathByIdList,
            };
        case actionType.POST_POSITION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.PUT_POSITION:
            return {
                ...state,
                message: action.result.updatedMessage,
            };
        case actionType.DELETE_POSITION:
            return {
                ...state,
                message: action.result.deletedMessage
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