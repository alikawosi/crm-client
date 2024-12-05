import * as actionType from './educationLevel.action';

const initialState = {
    educationLevelList:[],
    educationLevelItem:[],
    //---------------
    message: '',

};

export const educationLevelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_EDUCATIONLEVEL:
            return {
                ...state,
                educationLevelList: action.result.educationLevelList

            };
        case actionType.POST_EDUCATIONLEVEL:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_EDUCATIONLEVEL:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_EDUCATIONLEVELITEM:
            return {
                ...state,
                educationLevelItem: action.result.educationLevelItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_EDUCATIONLEVEL:
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