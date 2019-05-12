import React from 'react'
import styles from './page.module.css'

function PageRow({ children }) {
    return <div className={styles.row}>{children}</div>
}

export default PageRow
