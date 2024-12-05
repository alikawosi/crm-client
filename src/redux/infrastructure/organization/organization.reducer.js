import * as actionType from './organization.action';

const initialState = {

    organizationList:[],

    organizationScaleTitleList:[],
    organizationTypeTitleList:[],
    organizationIndustryTitleList:[],
    organizationFullPathList:[],
    branchTypeTitleList:[],

    organizationItem:[],
    organizationFullPathByIdList:[],
    organizationIndustryItemList:[],

    insertedOrganizationId:'',
    message: '',

    isOrganizationNationalIdDuplicated:false,

};

export const organizationReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_ORGANIZATION:
            return {
                ...state,
                organizationList: action.result.organizationList,
                insertedOrganizationId:'',

            };
        case actionType.GET_ORGANIZATIONFORMDATA:
            return {
                ...state,
                organizationScaleTitleList: action.result.organizationScaleTitleList,
                organizationTypeTitleList: action.result.organizationTypeTitleList,
                organizationIndustryTitleList: action.result.organizationIndustryTitleList,
                organizationFullPathList: action.result.organizationFullPathList,
                branchTypeTitleList: action.result.branchTypeTitleList
            };
        case actionType.POST_ORGANIZATION:
            return {
                ...state,
                insertedOrganizationId: action.result.insertedOrganizationId,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.GET_ORGANIZATIONITEM:
            return {
                ...state,
                organizationItem: action.result.organizationItem,
                organizationFullPathByIdList: action.result.organizationFullPathByIdList,
                organizationIndustryItemList: action.result.organizationIndustryItemList
            };
        case actionType.PUT_ORGANIZATION:
            return {
                ...state,
                message: action.result.updatedMessage,
            };
        case actionType.DELETE_ORGANIZATION:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };

            case actionType.GET_ORGANIZATIONNATIONALIDDUPLICATION:
                return {
                    ...state,
                    isOrganizationNationalIdDuplicated: action.result.isOrganizationNationalIdDuplicated,
                };
    

        default:
            return state;
    }
}