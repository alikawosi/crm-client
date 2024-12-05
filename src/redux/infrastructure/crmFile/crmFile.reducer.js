import * as actionType from './crmFile.action';

const initialState = {
    personCRMFileList: [],
    materialCRMFileList: [],
    propertyCRMFileList: [],
    productCRMFileList: [],
    organizationCRMFileList: [],
    //--
    message: '',

};

export const crmFileReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionType.GET_PERSONCRMFILE:
            return {
                ...state,
                personCRMFileList: action.result.personCRMFileList,
            };
        case actionType.POST_PERSONCRMFILE:
            return {
                ...state,
                message: action.result.insertedMessage
            };
        case actionType.DELETE_PERSONCRMFILE:
            return {
                ...state,
                message: action.result.deletedMessage
            };

        case actionType.GET_PRODUCTCRMFILE:
            return {
                ...state,
                productCRMFileList: action.result.productCRMFileList,
            };
        case actionType.POST_PRODUCTCRMFILE:
            return {
                ...state,
                message: action.result.insertedMessage
            };
        case actionType.DELETE_PRODUCTCRMFILE:
            return {
                ...state,
                message: action.result.deletedMessage
            };

        case actionType.GET_ORGANIZATIONCRMFILE:
            return {
                ...state,
                organizationCRMFileList: action.result.organizationCRMFileList,
            };
        case actionType.POST_ORGANIZATIONCRMFILE:
            return {
                ...state,
                message: action.result.insertedMessage
            };
        case actionType.DELETE_ORGANIZATIONCRMFILE:
            return {
                ...state,
                message: action.result.deletedMessage
            };


        default:
            return state;
    }
}