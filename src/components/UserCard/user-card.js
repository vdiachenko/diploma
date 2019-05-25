import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getGreetingName } from '../../utils'
import styles from './user-card.module.css'

function userCard({ user }) {
    return (
        user && (
            <NavLink to="/account" className={styles.user}>
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
            </NavLink>
        )
    )
}

export default connect(store => ({
    user: store.user,
}))(userCard)
