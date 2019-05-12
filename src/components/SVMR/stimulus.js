import React, { useState, useEffect } from 'react'
import useTimeout from 'use-timeout'
import Button from '../Button'
import styles from './square.module.css'

let stages = []

function Square({ testsCount, visible, children, onPassed }) {
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [ahead, setAhead] = useState(0)
    const [step, setStep] = useState(null)
    const [isVisible, setVisibility] = useState(false)
    const [delay, setDelay] = useState(null)

    useEffect(() => {
        if (!end || !start) {
            return
        }

        stages.push({ time: end - start, ahead, skip: false })
        setStart(null)
        setEnd(null)
        setAhead(0)

        if (stages.length === testsCount) {
            onPassed([...stages])
            setStep(null)
            stages = []
        }
    }, [start, end, ahead, testsCount, onPassed])

    useEffect(() => {
        if (!step) {
            setVisibility(false)
            return
        }

        setVisibility(false)
        setDelay(2500)
    }, [step])

    useEffect(() => {
        if (isVisible) {
            setStart(Date.now())
        }

        return () => {
            if (isVisible) {
                setEnd(Date.now())
            }
        }
    }, [isVisible])

    useTimeout(() => {
        setVisibility(true)
    }, delay)

    useEffect(() => {
        function clickHandler() {
            if (isVisible) {
                setDelay(null)
            } else {
                setAhead(ahead + 1)
                return
            }

            if (step < testsCount) {
                setStep(step + 1)
            } else {
                setStep(null)
            }
        }

        step && document.addEventListener('click', clickHandler, false)
        return () => document.removeEventListener('click', clickHandler, false)
    }, [step, testsCount, isVisible, ahead])

    function startHandler() {
        setStep(1)
    }

    return (
        <div>
            {
                <Button type="button" onClick={startHandler}>
                    Начать
                </Button>
            }
            {isVisible && <div className={styles.square} />}
        </div>
    )
}

export default Square
