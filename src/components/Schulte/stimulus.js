import React, { useState, useEffect } from 'react'
import Table, { TableRow, TableCell } from '../Table'
import Button from '../Button'
import styles from './schulte.module.css'

const matrix = []
let num = 0

function Schulte({ sequence, title, onPassed }) {
    const [step, setStep] = useState(null)
    const [error, setError] = useState(null)
    const [inProgress, setProgress] = useState(false)

    useEffect(() => {
        if (matrix.length) {
            return
        }

        const numbers = sequence.length
        const sqrt = Math.sqrt(numbers)
        const rows = sqrt
        const cols = sqrt

        for (let i = 0; i < rows; i++) {
            matrix.push({ id: i, value: [] })

            for (let j = 0; j < cols; j++) {
                matrix[i].value.push({
                    id: num,
                    value: sequence[num].value,
                })
                num++
            }
        }
    }, [sequence])

    useEffect(() => {
        if (sequence[step - 1] !== undefined) {
            sequence[step - 1].time = Date.now()
        }

        if (step === 1) {
            setProgress(true)
        }

        return () => {
            if (sequence[step - 1] !== undefined) {
                sequence[step - 1].time = Date.now() - sequence[step - 1].time
            }

            if (step === sequence.length) {
                setProgress(false)
                onPassed(sequence)
            }
        }
    }, [step, sequence, onPassed])

    useEffect(() => {
        if (error !== null) {
            sequence[step - 1].error = true
        }
    }, [error, step, sequence])

    function startHandler() {
        setStep(1)
    }

    function selectHandler(value) {
        if (value !== step) {
            setError(`Ошибка! Найдите число ${step}`)
        } else {
            setError(null)

            if (step + 1 <= sequence.length) {
                setStep(step + 1)
            } else {
                setStep(null)
            }
        }
    }

    return (
        <div>
            {
                <h3 className={styles.title}>
                    {title}
                    {error && <p className={styles.error}>{error}</p>}
                </h3>
            }

            {!inProgress && (
                <Button type="button" onClick={startHandler}>
                    Начать
                </Button>
            )}

            {inProgress && (
                <Table className={styles.table}>
                    {matrix.map(row => {
                        return (
                            <TableRow key={row.id}>
                                {row.value.map(col => {
                                    return (
                                        <TableCell
                                            key={col.id}
                                            value={col.value}
                                            className={styles.cell}
                                            onCellClick={selectHandler}
                                        >
                                            {col.value}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </Table>
            )}
        </div>
    )
}

export default Schulte
