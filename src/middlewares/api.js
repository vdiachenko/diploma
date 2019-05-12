import axios from 'axios'
import { START, SUCCESS, FAIL } from '../constants'

export default store => next => async action => {
    const { type, callAPI, payload, method = 'GET', ...rest } = action

    if (!callAPI) {
        return next(action)
    }

    next({
        type: type + START,
        ...rest,
    })

    try {
        const res = await axios({
            url: callAPI,
            method,
            data: payload,
        })

        next({
            type: type + SUCCESS,
            res: res.data,
            ...rest,
        })
    } catch (err) {
        next({
            type: type + FAIL,
            err,
            ...rest,
        })
    }
}
