import React from 'react'
import styles from './page.module.css'

function PageCol({ children }) {
    return <div className={styles.col}>{children}</div>
}

export default PageCol
