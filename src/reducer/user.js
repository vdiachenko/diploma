import {
    CHECK_TOKEN,
    AUTH,
    REGISTER,
    LOAD_SURVEYS,
    SUCCESS,
} from '../constants'

export default (user = null, action) => {
    const { type, res } = action

    switch (type) {
        case AUTH + SUCCESS:
            return { ...res }

        case CHECK_TOKEN + SUCCESS:
            return { ...res }

        case LOAD_SURVEYS + SUCCESS:
            return {
                ...user,
                surveys: [...res],
            }

        case REGISTER + SUCCESS:
            return { ...res }

        default:
            return user
    }
}
