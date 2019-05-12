import React from 'react'
import { NavLink } from 'react-router-dom'
import Page from '../Page'
import Button from '../Button'
import styles from './home.module.css'

function Home() {
    return (
        <Page>
            <h2 className={styles.title}>
                Программный комплекс для психофизиологического обследования
            </h2>
            <Button>
                <NavLink to="/auth">Начать</NavLink>
            </Button>
        </Page>
    )
}

export default Home
