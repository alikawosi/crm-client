import * as actionType from './organizationType.action';

const initialState = {
    organizationTypeList:[],
    organizationTypeItem:[],
    //---------------
    message: '',

};

export const organizationTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_ORGANIZATIONTYPE:
            return {
                ...state,
                organizationTypeList: action.result.organizationTypeList

            };
        case actionType.POST_ORGANIZATIONTYPE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_ORGANIZATIONTYPE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_ORGANIZATIONTYPEITEM:
            return {
                ...state,
                organizationTypeItem: action.result.organizationTypeItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_ORGANIZATIONTYPE:
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