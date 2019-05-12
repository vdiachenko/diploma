import React from 'react'
import styles from './table.module.css'

function tableCell({ children, value, onCellClick, ...rest }) {
    function clickHandler() {
        onCellClick && onCellClick(value)
    }

    return (
        <td className={styles.cell} onClick={clickHandler} {...rest}>
            {children}
        </td>
    )
}

export default tableCell
