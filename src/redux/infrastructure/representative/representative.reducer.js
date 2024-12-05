import * as actionType from './representative.action';

const initialState = {

    representativeList:[],

    representativeTypeTitleList:[],
    representativePersonTitleList:[],
    representativeOrganizationTitleList:[],
    representativeEmployeeTitleList:[],

    representativeDetailEmployeeTitleList:[],

    message: '',

};

export const representativeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_REPRESENTATIVE:
            return {
                ...state,
                representativeList: action.result.representativeList
            };
        case actionType.GET_REPRESENTATIVEFORMDATA:
            return {
                ...state,
                representativeTypeTitleList: action.result.representativeTypeTitleList,
                representativePersonTitleList: action.result.representativePersonTitleList,
                representativeOrganizationTitleList: action.result.representativeOrganizationTitleList,
                representativeEmployeeTitleList: action.result.representativeEmployeeTitleList,
            };
        case actionType.GET_REPRESENTATIVEDETAILFORMDATA:
            return {
                ...state,
                representativeDetailEmployeeTitleList: action.result.representativeDetailEmployeeTitleList,
            };
        case actionType.POST_REPRESENTATIVE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.DELETE_REPRESENTATIVE:
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