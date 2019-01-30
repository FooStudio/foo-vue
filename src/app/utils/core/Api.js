import request from 'superagent'

export default class Api {

    _endpoints = Object.freeze({})

    get endpoints() {
        return this._endpoints
    }

    /**
     * @param {string} endpoint
     * @param {{}=} data
     */
    static async post(endpoint, data) {
        const response = await request
            .post(endpoint)
            .send(data)
        if (response.status === 200) {
            return response
        } else {
            throw response
        }
    }

    /**
     * @param {string} endpoint
     */
    static async get(endpoint) {
        const response = await request.get(endpoint)
        if (response.status === 200) {
            return response
        } else {
            throw response
        }
    }
}
