import React from 'react'
import UserCard from '../UserCard'
import styles from './header.module.css'

function Header({ title }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <UserCard />
        </header>
    )
}

export default Header
