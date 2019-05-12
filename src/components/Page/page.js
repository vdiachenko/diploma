import React from 'react'
import Header from '../Header'
import styles from './page.module.css'

function Page({ title, children, hideHeader }) {
    return (
        <React.Fragment>
            {!hideHeader && <Header title={title} />}
            <main className={styles.main}>{children}</main>
        </React.Fragment>
    )
}

export default Page
