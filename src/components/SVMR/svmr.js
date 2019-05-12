import React, { useState } from 'react'
import { connect } from 'react-redux'
import { saveSurvey } from '../../ac'
import { userSelector } from '../../selectors'
import Page from '../Page'
import Stimulus from './stimulus'

const testsCount = 2
const stimulusCount = 2
const ids = Array.from({ length: testsCount }, (v, k) => ++k)
const results = []

function SVMR({ user, saveSurvey }) {
    const [step, setStep] = useState(1)
    const stimulus = ids.map(number => {
        return (
            <Stimulus
                key={number.toString()}
                testsCount={stimulusCount}
                onPassed={onPassed}
            />
        )
    })

    function onPassed(data) {
        results.push({ step, values: data })

        if (results.length === testsCount) {
            setStep(null)
            saveSurvey({ user: user._id, stats: results, method: 'svmr' })
        } else {
            setStep(step + 1)
        }
    }

    return (
        <Page title="Простая зрительно-моторная реакция">
            Проба № {step}
            {stimulus[step - 1]}
        </Page>
    )
}

export default connect(
    state => ({
        user: userSelector(state),
    }),
    {
        saveSurvey,
    }
)(SVMR)
