import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Page, { PageRow, PageCol } from '../Page'
import { SchulteResults } from '../Schulte'
import { SVMRResults } from '../SVMR'

function Survey({ match }) {
    const [survey, setSurvey] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`/api/surveys/${match.params.id}`)

            setSurvey(res.data)
        }

        !survey && fetchData()
    })

    function stats() {
        if (!survey) {
            return <p>Загрузка результатов обследования</p>
        }

        if (survey.method === 'schulte') {
            return <SchulteResults data={survey} user={survey.user} />
        } else if (survey.method === 'svmr') {
            return <SVMRResults data={survey} user={survey.user} />
        }
    }

    return (
        <Page title="Результаты обследования">
            <PageRow>
                <PageCol>{stats()}</PageCol>
            </PageRow>
        </Page>
    )
}

export default connect()(Survey)
