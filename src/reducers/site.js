

const siteReducerDefaultState = {
    showSiteModal: false,
    loading: false,
    error: '',
    success: '',
    theme: undefined
};

const siteReducer = (state = siteReducerDefaultState, action) => {
    switch (action.type) {

        case 'SET_DATA':
            return { ...state, ...action.data};

        case 'SET_SUCCESS':
            return { ...state, success: action.success };

        case 'SET_ERROR':
            return { ...state, error: action.error };

        case 'CLEAR_STATUS':
            return { ...state, success: '', error: '' };

        case 'START_LOADING':
            return { ...state, loading: true };

        case 'STOP_LOADING':
            return { ...state, loading: false };

        case 'SHOW_MODAL':
            return { ...state, showSiteModal: true };

        case 'HIDE_MODAL':
            return { ...state, showSiteModal: false, error: '', success: '' };

        case 'UPDATE_SITE':
            return { ...state, ...action.update };

        case 'SET_THEME':
            return { ...state, theme: action.theme };
    
        default:
            return state;
    }

}



export default siteReducer;