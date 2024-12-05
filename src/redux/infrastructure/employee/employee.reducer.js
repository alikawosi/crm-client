import * as actionType from './employee.action';

const initialState = {

    employeeList:[],

    employeeCategoryTitleList:[],
    employeePositionTitleList:[],
    personFullNameList:[],  

    message: '',

};

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_EMPLOYEE:
            return {
                ...state,
                employeeList: action.result.employeeList
            };
        case actionType.GET_EMPLOYEEFORMDATA:
            return {
                ...state,
                employeeCategoryTitleList: action.result.employeeCategoryTitleList,
                employeePositionTitleList: action.result.employeePositionTitleList,
                personFullNameList: action.result.personFullNameList
            };
        case actionType.POST_EMPLOYEE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.DELETE_EMPLOYEE:
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