import { INI_STATE, SET_BALANCE, SET_PURCHASES, SET_DEPOSITS } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case INI_STATE:
            return { ...action.payload };
        case SET_BALANCE:
            return { ...state, balance: action.payload };
        case SET_PURCHASES:
            return { ...state, purchases: action.payload };
        case SET_DEPOSITS:
            return { ...state, deposits: action.payload };
        default:
            return state;
    }
}