import React from 'react'
import Spinner from '../Spinner'
import styles from './button.module.css'

function Button({ type, children, isLoading, ...restProps }) {
    return (
        <button
            type={type}
            className={isLoading ? styles.loading : styles.button}
            disabled={isLoading}
            {...restProps}
        >
            {isLoading && <Spinner classNames={styles.spinner} />}
            <span className={styles.children}>{children}</span>
        </button>
    )
}

export default Button
