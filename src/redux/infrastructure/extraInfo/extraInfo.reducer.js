import * as actionType from './extraInfo.action';

const initialState = {
    extraInfoFieldTypeList: [],
    personExtraInfoList: [],
    extraInfoCRMTableList: [],
    tableDataList: [],
    templateList:[],
    organizationExtraInfoList:[]

};

export const extraInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PERSONEXTRAINFO:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                personExtraInfoList: action.result.personExtraInfoList,
            };
        case actionType.POST_PERSONEXTRAINFO:
            return {
                ...state,
            };
        case actionType.DELETE_PERSONEXTRAINFO:
            return {
                ...state,
            };

        case actionType.GET_ORGANIZATIONEXTRAINFO:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                organizationExtraInfoList: action.result.organizationExtraInfoList,
            };
        case actionType.POST_ORGANIZATIONEXTRAINFO:
            return {
                ...state,
            };
        case actionType.DELETE_ORGANIZATIONEXTRAINFO:
            return {
                ...state,
            };

        case actionType.GET_EXTRAINFOCRMTABLE:
            return {
                ...state,
                extraInfoCRMTableList: action.result.extraInfoCRMTableList,
            };
        case actionType.GET_EXTRAINFOTABLEDATA:
            return {
                ...state,
                tableDataList: action.result.tableDataList,
            };
        case actionType.GET_TEMPLATE:
            return {
                ...state,
                templateList: action.result.templateList,
            };


        default:
            return state;
    }
}