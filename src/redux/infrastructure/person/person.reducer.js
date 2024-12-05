import * as actionType from './person.action';

const initialState = {
    personList: [],
    insertedPersonId: '',
    educationLevelTitleList: [],
    industryTitleList: [],
    personItem: [],
    personIndustryItem: [],
    isPersonNationalCodeDuplicated: false,
    //---------------
    message: '',

};

export const personReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PERSON:
            return {
                ...state,
                personList: action.result.personList,
                insertedPersonId: '',
            };
        case actionType.GET_PERSONFORMDATA:
            return {
                ...state,
                educationLevelTitleList: action.result.educationLevelTitleList,
                industryTitleList: action.result.industryTitleList,

            };
        case actionType.POST_PERSON:
            return {
                ...state,
                insertedPersonId: action.result.insertedPersonId,
                personList: action.result.personList,
                message: action.result.identityDictionary.insertedMessage,
            
            };
        case actionType.DELETE_PERSON:
            return {
                ...state,
                personList: action.result.personList,
                message: action.result.identityDictionary.deletedMessage
            };
        case actionType.GET_PERSONITEM:
            return {
                ...state,
                personItem: action.result.personItem,
                personIndustryItem: action.result.personIndustryItem,
            };
        case actionType.PUT_PERSON:
            return {
                ...state,
                personList: action.result.personList,
                message: action.result.identityDictionary.updatedMessage,
           
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };
        case actionType.GET_PERSONNATIONALCODEDUPLICATION:
            return {
                ...state,
                isPersonNationalCodeDuplicated: action.result.isPersonNationalCodeDuplicated,
            };


        default:
            return state;
    }
}