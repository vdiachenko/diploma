import { LOAD_USERS, SUCCESS } from '../constants'

export default (users = {}, action) => {
    const { type, res } = action

    switch (type) {
        case LOAD_USERS + SUCCESS:
            return { ...res }

        default:
            return users
    }
}
