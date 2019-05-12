import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { auth, loadUsers } from '../../ac'
import { usersSelector } from '../../selectors'
import { Formik, Form, Field } from 'formik'
import dayjs from 'dayjs'
import styles from './create-user.module.css'

function getFullname(user) {
    return `${user.lastname} ${user.firstname.charAt(
        0
    )}. ${user.middlename.charAt(0)}.`
}

function CreateUser({ users, dispatch, auth, fetchUsers }) {
    // const [surveyedUser, set] = useState(null)
    const [existingUser, setExistingUser] = useState(null)
    const [uniqId, setUniqId] = useState(null)

    // useEffect(() => {
    //     console.log(users)
    // }, [users])

    useEffect(() => {
        // console.log(users)
        // auth()
        // fetchUsers()
        setUniqId((Date.now() + Math.random()).toString())
    }, [auth, fetchUsers])

    const initialValues = {
        id: '',
        date: '',
        survey: '',
        lastname: '',
        firstname: '',
        middlename: '',
        gender: '',
        dob: '',
    }

    function changeCodeHandler(ev) {
        if (users[ev.target.value] !== undefined) {
            setExistingUser(users[ev.target.value])
        } else {
            setExistingUser(null)
        }
    }

    function authHandler() {
        console.log(existingUser)
    }

    function saveUser(values, actions) {
        dispatch({ type: 'SAVE_USER', payload: values })
    }

    return (
        <div>
            <h1>Обследуемый</h1>

            <p>Дата обследования: {dayjs().format('DD.MM.YYYY')}</p>

            <NavLink to="/tests">tests</NavLink>

            <Formik initialValues={initialValues} onSubmit={saveUser}>
                <Form>
                    <div className="row row-code">
                        <Field
                            type="text"
                            name="code"
                            id={`${uniqId}-code`}
                            onChange={changeCodeHandler}
                        />
                        <label htmlFor={`${uniqId}-code`}>
                            Индивидуальный номер
                        </label>
                        {existingUser && (
                            <span className={styles.existingUser}>
                                Пользователь:{' '}
                                <b
                                    className={styles.fullname}
                                    onClick={authHandler}
                                >
                                    {getFullname(existingUser)}
                                </b>
                            </span>
                        )}
                    </div>
                    {/* */}
                    <div className="row">
                        <div className="col">
                            <Field
                                type="text"
                                name="lastname"
                                id={`${uniqId}-lastname`}
                                value={'adf'}
                            />
                            <label htmlFor={`${uniqId}-lastname`}>
                                Фамилия
                            </label>
                        </div>

                        <div className="col">
                            <Field
                                type="text"
                                name="firstname"
                                id={`${uniqId}-firstname`}
                            />
                            <label htmlFor={`${uniqId}-firstname`}>Имя</label>
                        </div>

                        <div className="col">
                            <Field
                                type="text"
                                name="middlename"
                                id={`${uniqId}-middlename`}
                            />
                            <label htmlFor={`${uniqId}-middlename`}>
                                Отчество
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <span>Пол</span>
                        </div>

                        <div className="col">
                            <Field
                                type="radio"
                                name="gender"
                                value="male"
                                id={`${uniqId}-gender-male`}
                            />
                            <label htmlFor={`${uniqId}-gender-male`}>
                                Мужской
                            </label>
                        </div>

                        <div className="col">
                            <Field
                                type="radio"
                                name="gender"
                                value="famale"
                                id={`${uniqId}-gender-famale`}
                            />
                            <label htmlFor={`${uniqId}-gender-famale`}>
                                Женский
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <Field type="date" name="dob" id={`${uniqId}-dob`} />
                        <label htmlFor={`${uniqId}-dob`}>Дата рождения</label>

                        <span>Возраст:</span>
                    </div>

                    <div className="row">
                        <Field
                            type="text"
                            name="education"
                            component="select"
                            id={`${uniqId}-education`}
                        >
                            <option value="incomplete_secondary">
                                Неполное среднее (до 8 кл.)
                            </option>
                            <option value="secondary">Среднее (11 кл.)</option>
                            <option value="initial_vocational">
                                Начальное профессиональное{' '}
                            </option>
                            <option value="secondary_vocational">
                                Среднее профессиональное
                            </option>
                            <option value="higher_professional">
                                Высшее профессиональное
                            </option>
                            <option value="incomplete">Незаконченное</option>
                        </Field>

                        <label htmlFor={`${uniqId}-education`}>
                            Образование
                        </label>
                    </div>

                    <div className="row">
                        <Field
                            type="text"
                            name="position"
                            id={`${uniqId}-position`}
                        />
                        <label htmlFor={`${uniqId}-position`}>
                            Должность по наст. месту работы
                        </label>
                    </div>

                    <div className="row">
                        <button type="submit">Обследование</button>
                    </div>
                </Form>
            </Formik>

            {/*
            <h2>Индивидуальные (персональные) данные</h2>

            <Formik 
                initialValues={initialValues}
                onSubmit={saveUser}>

                <Form>
                    <Field type="text" name="id" placeholder="Код"/>
                    <Field type="text" name="date" placeholder="Дата обследования" />

                    <Field type="text" name="survey" placeholder="Обследование" component="select">
                        <option value="primary">Первичное</option>
                        <option value="periodic">Периодическое</option>
                        <option value="repeat">Повторное</option>
                        <option value="unplanned">Внеплановое</option>
                    </Field>

                    <Field type="text" name="lastname" placeholder="Фамилия" />
                    <Field type="text" name="firstname" placeholder="Имя" />
                    <Field type="text" name="middlename" placeholder="Отчество" />

                    <Field type="text" name="gender" placeholder="Пол" />
                    <Field type="date" name="dob" placeholder="Дата рождения" />

                    <button type="submit">Submit</button>
                </Form>

            </Formik>

            <h2>Социальная информация</h2>

            <Formik 
                initialValues={{ email: '', password: '' }}
                onSubmit={saveUser}>

                <Form>
                    <Field type="text" name="bpl" placeholder="Место рождения" />
                    
                    <Field type="text" name="family_condition" placeholder="Состояние семьи" component="select">
                        <option value="full">Полная семья</option>
                        <option value="incomplete">Неполная семья(отсутствует один из родителей)</option>
                        <option value="absence">Отсутствие родителей</option>
                    </Field>

                    <label>Основные профессии (или должности) родителей</label>
                    <Field type="text" name="father_profession" placeholder="Отец" />
                    <Field type="text" name="mother_profession" placeholder="Мать" />

                    <Field type="radio" name="brothers_or_sisters" placeholder="Наличие братьев, сестер" value="yes" />
                    <Field type="radio" name="brothers_or_sisters" placeholder="Наличие братьев, сестер" value="no" />

                    <Field type="text" name="brothers_or_sisters_count" />

                    <Field type="text" name="survey" placeholder="Образование" component="select">
                        <option value="primary">Неполное среднее (до 8 кл.)</option>
                        <option value="periodic">Среднее (11 кл.)</option>
                        <option value="repeat">Начальное профессиональное </option>
                        <option value="unplanned">Среднее профессиональное</option>
                        <option value="unplanned">Высшее профессиональное</option>
                        <option value="unplanned">Незаконченное</option>
                    </Field>

                    <Field type="text" name="firstname" placeholder="Основная специальность (профессия)" />
                    
                    <Field type="radio" name="job" placeholder="Наличие работы" value="yes"/>
                    <Field type="radio" name="job" placeholder="Наличие работы" value="no"/>

                    <Field type="text" name="middlename" placeholder="Должность по наст. месту работы" />
                    <Field type="text" name="middlename" placeholder="Стаж по наст. месту работы" />
                </Form>

            </Formik>
            */}
        </div>
    )
}

export default connect(
    state => ({
        users: usersSelector(state),
    }),
    {
        auth,
        fetchUsers: loadUsers,
    }
)(CreateUser)
