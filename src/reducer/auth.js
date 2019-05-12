import { LOAD_USER, START, SUCCESS, FAIL } from '../constants'

// authorized

export default (auth = {}, action) => {
    const { type, res } = action

    switch (type) {
        case LOAD_USER + START:
            return { ...auth, loading: true }

        case LOAD_USER + SUCCESS:
            return { ...res, loading: false }

        case LOAD_USER + FAIL:
            return { ...auth, loading: false }

        default:
            return auth
    }
}
