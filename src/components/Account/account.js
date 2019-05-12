import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { userSelector } from '../../selectors'
import { loadSurveys } from '../../ac'
import dayjs from 'dayjs'
import Page from '../Page'

function Account({ user, loadSurveys }) {
    useEffect(() => {
        if (user && !user.surveys) {
            loadSurveys(user._id)
        }
    }, [user, loadSurveys])

    return (
        <Page title="Личный кабинет">
            <h2>Пройденные обследования:</h2>

            {user && user.surveys && (
                <ul>
                    {user.surveys.map(survey => (
                        <li key={survey._id}>
                            <NavLink to={`/survey/${survey._id}/`}>
                                Дата обследования:{' '}
                                {dayjs(survey.created).format('DD.MM.YYYY')}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </Page>
    )
}

export default connect(
    state => ({
        user: userSelector(state),
    }),
    {
        loadSurveys,
    }
)(Account)
