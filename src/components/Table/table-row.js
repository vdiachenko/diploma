import React from 'react'
import styles from './table.module.css'

function TableRow({ children }) {
    return <tr className={styles.row}>{children}</tr>
}

export default TableRow
