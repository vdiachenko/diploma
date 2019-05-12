import React from 'react'
import TableRow from './table-row'
import styles from './table.module.css'

function Table({ data, children }) {
    return (
        <table className={styles.table}>
            {data && data.head && (
                <thead className={styles.head}>
                    <TableRow className={styles.row}>
                        {data.head.map(item => {
                            return (
                                <th className={styles.cell} key={item.id}>
                                    {item.value}
                                </th>
                            )
                        })}
                    </TableRow>
                </thead>
            )}

            <tbody>{children}</tbody>
        </table>
    )
}

export default Table
