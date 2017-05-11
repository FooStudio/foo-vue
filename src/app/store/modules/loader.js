/**
 * Created by mendieta on 11/4/16.
 */
import Preloader from "preloader";
import request from "superagent";

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
        return new Promise((resolve, reject) => {
            commit(PROGRESS, 0);
            commit(LOAD, assets);
            commit(LOADING, true);
            if (typeof assets === "object") {
                let loader = new Preloader();
                assets.foreach(file => loader.add(file));
                loader.on("progress", (val) => commit(PROGRESS, val));
                loader.on("complete", () => {
                    commit(PROGRESS, 1);
                    commit(LOADED);
                    resolve();
                });
                loader.load();
            } else if (typeof assets === "string") {
                request.get(assets)
                    .then((response) => {
                        commit(LOADED);
                        resolve(response.body);
                    })
                    .catch((error) => {
                        console.error(`Error Loading asset: ${assets} with error - ${error}`);
                        commit(LOADED);
                        reject(new Error("Error"));
                    });
            }
        });
    }
};

const mutations = {
    [LOADED](state){
        state.loading = false;
    },
    [LOADING](state, loading){
        state.loading = loading;
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
    },
    loaderAssets: state => {
        return state.assets;
    }
};

export default {state, actions, mutations, getters};
