import * as actionType from './common.action';

const initialState = {

    sidebarSelectedItem: '',
    generalSettingSelectedItem:'',
    isSidebarOpen:true,


};

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_SIDEBAR_SELECTEDITEM:
            return {
                ...state,
                sidebarSelectedItem: action.result,
                generalSettingSelectedItem:'',

            };
        case actionType.SET_GENERALSETTING_CONTENT:
            return {
                ...state,
                generalSettingSelectedItem: action.result

            };

            case actionType.SET_ISSIDEBAROPEN:
                return {
                    ...state,
                    isSidebarOpen: action.result
    
                };
    
        default:
            return state;
    }
}