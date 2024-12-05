import * as actionType from './property.action';

const initialState = {
    propertyList: [],
    propertyScaleList: [],
    propertyFieldTypeList: [],
    propertyTemplateList:[],
    propertyItem:[],
    checkRefFlagMaterial:false,
      //---------------
    message: '',

};

export const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PROPERTY:
            return {
                ...state,
                propertyList: action.result.propertyList,

            };

            case actionType.GET_SCALETITLE:
                return {
                    ...state,
                    propertyScaleList: action.result.propertyScaleList,
                };

            case actionType.GET_PROPERTYITEM:
                return {
                    ...state,
                    propertyItem: action.result.propertyItem
                };

        case actionType.GET_PROPERTYFORMDATA:
            return {
                ...state,
                propertyScaleList: action.result.propertyScaleList,
                propertyFieldTypeList: action.result.propertyFieldTypeList,
            };
        case actionType.GET_PROPERTYTEMPLATE:
            return {
                ...state,
                propertyTemplateList: action.result.propertyTemplateList,
            };
        case actionType.POST_PROPERTY:
            return {
                ...state,
                message: action.result.insertedMessage,
            };

            case actionType.PUT_PROPERTY:
                return {
                    ...state,
                    propertyList: action.result.propertyList,
                    checkRefFlagMaterial: action.result.checkRefFlagMaterial,
                    message: action.result.identityDictionary.updatedMessage,
                };


        case actionType.DELETE_PROPERTY:
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