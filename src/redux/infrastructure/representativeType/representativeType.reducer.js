import * as actionType from './representativeType.action';

const initialState = {
    representativeTypeList:[],
    representativeTypeItem:[],
    //---------------
    message: '',

};

export const representativeTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_REPRESENTATIVETYPE:
            return {
                ...state,
                representativeTypeList: action.result.representativeTypeList

            };
        case actionType.POST_REPRESENTATIVETYPE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_REPRESENTATIVETYPE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_REPRESENTATIVETYPEITEM:
            return {
                ...state,
                representativeTypeItem: action.result.representativeTypeItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_REPRESENTATIVETYPE:
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