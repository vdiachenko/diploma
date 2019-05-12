import React from 'react'
import { getFullname, getAge, getGenderLabel } from '../../utils'
import dayjs from 'dayjs'

function PersonalInfo({ user }) {
    return (
        <div>
            <p>
                Индивидуальный номер испытуемого: <b>{user.code}</b>
            </p>
            <p>
                ФИО: <b>{getFullname(user)}</b>
            </p>
            <p>
                Дата рождения: <b>{dayjs(user.dob).format('DD.MM.YYYY')}</b>
            </p>
            <p>
                Возраст: <b>{getAge(user.dob)}</b>
            </p>
            <p>
                Пол: <b>{getGenderLabel(user.gender)}</b>
            </p>
            <p>
                Образование: <b>{user.education}</b>
            </p>
            <p>
                Статус: <b>{user.position}</b>
            </p>
        </div>
    )
}

export default PersonalInfo
