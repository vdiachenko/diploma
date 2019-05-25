import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { userSelector } from '../../selectors'
import { loadSurveys } from '../../ac'
import dayjs from 'dayjs'
import Page, { PageRow, PageCol } from '../Page'
import { PersonalInfo } from '../Account'

function Account({ user, loadSurveys }) {
    useEffect(() => {
        if (user && !user.surveys) {
            loadSurveys(user._id)
        }
    }, [user, loadSurveys])

    function surveyItemBody(survey) {
        const title =
            survey.method === 'schulte'
                ? '"Таблицы Шульте"'
                : '"Простая зрительно-моторная реакция"'

        return (
            <li key={survey._id}>
                <NavLink to={`/survey/${survey._id}/`}>
                    <p>
                        <b>{title}</b>
                    </p>

                    <small>
                        Дата обследования:{' '}
                        {dayjs(survey.created).format('DD.MM.YYYY')}
                    </small>
                </NavLink>
            </li>
        )
    }

    return (
        <Page title="Личный кабинет">
            <PageRow>
                <PageCol>
                    <h2>Персональные данные:</h2>

                    {user && <PersonalInfo user={user} />}
                </PageCol>

                <PageCol>
                    <h2>Пройденные обследования:</h2>

                    {user && user.surveys && (
                        <ul>{user.surveys.map(surveyItemBody)}</ul>
                    )}
                </PageCol>
            </PageRow>
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
