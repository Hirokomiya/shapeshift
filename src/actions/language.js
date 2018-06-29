import language from '../language/language';

export const setLanguage = (option = 'en') => ({
    type: 'CHANGE_LANG',
    lang: language[option] || language['en']
});

export const startSetLanguage = (option) => {
    return (dispatch) => {
        dispatch(setLanguage(option));
    }
}

