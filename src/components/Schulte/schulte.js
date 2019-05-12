import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { saveSurvey } from '../../ac'
import { userSelector } from '../../selectors'
import shuffle from 'shuffle-array'
import Page from '../Page'
import Stimulus from './stimulus'

const data = []
const stimulusCount = 5
const sequenceLength = 25
const ids = Array.from({ length: sequenceLength }, (v, k) => ++k)

function generateSequence(length) {
    return shuffle(
        Array.from({ length }, (v, k) => {
            return { time: null, value: ++k, error: false }
        })
    )
}

function SchulteTest({ user, saveSurvey }) {
    const [step, setStep] = useState(null)

    useEffect(() => {
        step === null && !data.length && setStep(1)
    }, [step])

    function onPassed(results) {
        data.push({ id: step, values: results })

        if (step < stimulusCount) {
            setStep(step + 1)
        } else {
            setStep(null)
            saveSurvey({ user: user._id, stats: data, method: 'schulte' })
        }
    }

    const stimulus = ids.map(number => {
        return (
            <Stimulus
                key={number.toString()}
                title={`Таблица №${number}`}
                sequence={generateSequence(sequenceLength)}
                onPassed={onPassed}
            />
        )
    })

    return <Page title="Таблицы Шульте">{stimulus[step - 1]}</Page>
}

export default connect(
    state => ({
        user: userSelector(state),
    }),
    {
        saveSurvey,
    }
)(SchulteTest)
