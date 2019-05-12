import React from 'react'
import { connect } from 'react-redux'
import { getGreetingName } from '../../utils'
import styles from './user-card.module.css'

function userCard({ user }) {
    return (
        user && (
            <div className={styles.user}>
                {user.gender === 'male' && (
                    <span role="img" aria-label="gender">
                        👨‍💼
                    </span>
                )}
                {user.gender === 'famale' && (
                    <span role="img" aria-label="gender">
                        👩‍💼
                    </span>
                )}
                <b>{getGreetingName(user)}</b>
            </div>
        )
    )
}

export default connect(store => ({
    user: store.user,
}))(userCard)
