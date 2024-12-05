import * as actionType from './auth.action';

const initialState = {

    userMenuAccessList: [],
    isTokenExpired: false,
    expirationTime: null,
    userId: '',
    domain: null,
    userName: '',
    email: '',
    checkTokenCounter: 0,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.DECODE_TOKEN:
            return ({
                ...state,
                userMenuAccessList: action.userMenu,
                accessLevelList: action.accessLevel,
                expirationTime: action.expirationTime,
                userId: action.userId,
                domain:parseInt(action.domain) ,
                userName: action.userName,
                email: action.email,
            });

        case actionType.CHECKEXPIRE_TOKEN:
            return ({
                ...state,
                isTokenExpired: true,
                checkTokenCounter: action.result + 1,
            });


        default:
            return state;
    }
}