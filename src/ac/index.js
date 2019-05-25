import { replace } from 'connected-react-router'
import {
    AUTH,
    REGISTER,
    CHECK_TOKEN,
    LOAD_USER,
    LOAD_USERS,
    SAVE_SURVEY,
    LOAD_SURVEYS,
} from '../constants'
import axios from 'axios'

export const auth = data => {
    return {
        type: AUTH,
        callAPI: '/api/auth',
        method: 'POST',
        payload: data,
    }
}

export const register = data => {
    return {
        type: REGISTER,
        callAPI: '/api/register',
        method: 'POST',
        payload: data,
    }
}

export const checkToken = () => {
    return {
        type: CHECK_TOKEN,
        callAPI: '/api/check-token',
    }
}

export const loadUser = id => {
    return {
        type: LOAD_USER,
        callAPI: `/api/users/${id}`,
    }
}

export const loadUsers = () => {
    return {
        type: LOAD_USERS,
        callAPI: '/api/users',
    }
}

export const saveResult = ({ callAPI, payload }) => {
    return {
        type: SAVE_SURVEY,
        callAPI,
        method: 'POST',
        payload,
    }
}

export const saveSurvey = payload => {
    return dispatch => {
        axios.post('/api/survey/save', payload).then(res => {
            dispatch(replace(res.data.redirectUrl))
        })
    }
}

export const loadSurvey = id => {
    return {
        type: LOAD_SURVEYS,
        callAPI: `/api/surveys/${id}`,
    }
}

export const loadSurveys = userId => {
    return {
        type: LOAD_SURVEYS,
        callAPI: `/api/user/surveys/${userId}`,
    }
}
