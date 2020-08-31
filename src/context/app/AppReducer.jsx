import { SET_LOADING } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, loading: action.data};
        default:
            return state;
    }
}