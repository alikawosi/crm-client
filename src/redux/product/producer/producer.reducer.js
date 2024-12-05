import * as actionType from './producer.action';

const initialState = {
    materialScaleList: [],
    producerTitleList:[],
    producerMaterialList:[],
    //---------------
    message: '',

};

export const producerReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_PRODUCER:
            return {
                ...state,
                producerList: action.result.producerList
            };

        case actionType.GET_PRODUCERMATERIAL:
            return {
                ...state,
                producerMaterialList: action.result.producerMaterialList
            };
    
        case actionType.GET_PRODUCERFORMDATA:
            return {
                ...state,
                producerTitleList: action.result.producerTitleList
            };


            case actionType.POST_PRODUCER:
                return {
                    ...state,
                    message: action.result.insertedMessage
                };

            case actionType.DELETE_PRODUCER:
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