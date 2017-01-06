/**
 * Created by mendieta on 11/4/16.
 */
export const LOADING = "loader/loading";
export const LOADED = "loader/loaded";
export const PROGRESS = "loader/progress";
export const LOAD = "loader/load";

const state = {
    loading: false,
    progress: 0,
    assets: []
};

const actions = {
    [LOADING]({commit}, loading){
        commit(LOADING, loading);
    },
    [LOADED]({commit}){
        commit(LOADED);
    },
    [PROGRESS]({commit}, progress){
        commit(PROGRESS, progress);
    },
    [LOAD]({commit}, assets){
        commit(LOADING, true);
        commit(LOAD, assets);
    }
};

const mutations = {
    [LOADED](state){
        state.loading = false;
    },
    [LOADING](state, loading){
        state.loading = loading
    },
    [PROGRESS](state, progress){
        state.progress = progress;
    },
    [LOAD](state, assets){
        state.assets = assets;
    }
};

const getters = {
    loading: state => {
        return state.loading;
    },
    progress: state => {
        return state.progress;
    }
};

export default {state, actions, mutations, getters};
