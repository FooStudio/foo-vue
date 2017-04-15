/**
 * Created by mendieta on 10/23/16.
 */

export const LOCALE_CHANGED = "locale/changed";
export const LOCALE_LOADING = "locale/loading";

const state = {
    locale: "",
    locale_loading: false
};

const actions = {};

const mutations = {
    [LOCALE_CHANGED](state, locale){
        state.locale = locale;
        state.locale_loading = false;
    },
    [LOCALE_LOADING](state){
        state.locale_loading = true;
    },
};

const getters = {
    locale: state => {
        return state.locale;
    }
};

export default {state, actions, mutations, getters};
