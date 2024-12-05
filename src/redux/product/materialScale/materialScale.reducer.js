import * as actionType from './materialScale.action';

const initialState = {
    materialScaleList: [],
    scaleFullPathList:[],
    //---------------
    message: '',

};

export const materialScaleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_MATERIALSCALE:
            return {
                ...state,
                materialScaleList: action.result.materialScaleList
            };
        case actionType.GET_MATERIALSCALEFORMDATA:
            return {
                ...state,
                scaleFullPathList: action.result.scaleFullPathList
            };
        case actionType.POST_MATERIALSCALE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_MATERIALSCALE:
            return {
                ...state,
                message: action.result.insertedMessage,
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