import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register, loadUser, loadUsers } from '../../ac'
import { userSelector, authLoadingSelector } from '../../selectors'
import { Formik, Form, Field } from 'formik'
import Button from '../Button'
import styles from '../Auth/auth.module.css'

function AccountCreate({ register, user, loading, code }) {
    const [uniqId, setUniqId] = useState(null)

    useEffect(() => {
        setUniqId((Date.now() + Math.random()).toString())
    }, [])

    function submitHandler(values) {
        register(values)
    }

    return (
        <React.Fragment>
            {user && <Redirect to="/tests" />}
            <Formik
                initialValues={{
                    code: code,
                    lastname: '',
                    firstname: '',
                    middlename: '',
                    gender: '',
                    dob: '',
                    password: '',
                }}
                // validate={values => {
                //     let errors = {}

                //     // for (values of value) {

                //     // }

                //     // if (!values.email) {
                //     //   errors.email = 'Required';
                //     // } else if (
                //     //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //     // ) {
                //     //   errors.email = 'Invalid email address';
                //     // }
                //     return errors
                // }}
                onSubmit={submitHandler}
            >
                <Form className={styles.form}>
                    <div className="row row-code">
                        <Field
                            type="text"
                            name="code"
                            id={`${uniqId}-code`}
                            readOnly={true}
                        />
                        <label htmlFor={`${uniqId}-code`}>
                            Индивидуальный номер
                        </label>
                    </div>

                    <div className="row">
                        <Field
                            type="text"
                            name="lastname"
                            id={`${uniqId}-lastname`}
                        />
                        <label htmlFor={`${uniqId}-lastname`}>Фамилия</label>
                    </div>

                    <div className="row">
                        <Field
                            type="text"
                            name="firstname"
                            id={`${uniqId}-firstname`}
                        />
                        <label htmlFor={`${uniqId}-firstname`}>Имя</label>
                    </div>

                    <div className="row">
                        <Field
                            type="text"
                            name="middlename"
                            id={`${uniqId}-middlename`}
                        />
                        <label htmlFor={`${uniqId}-middlename`}>Отчество</label>
                    </div>

                    <div className="row row-gender">
                        <p className="row-title">Пол</p>

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
                    </div>

                    <div className="row">
                        <Field
                            type="text"
                            name="education"
                            component="select"
                            id={`${uniqId}-education`}
                        >
                            <option value=" " />
                            <option value="incomplete_secondary">
                                неполное среднее (до 8 кл.)
                            </option>
                            <option value="secondary">среднее (11 кл.)</option>
                            <option value="initial_vocational">
                                начальное профессиональное{' '}
                            </option>
                            <option value="secondary_vocational">
                                среднее профессиональное
                            </option>
                            <option value="higher_professional">
                                высшее профессиональное
                            </option>
                            <option value="incomplete">незаконченное</option>
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

                    <div className="row row-password">
                        <Field
                            type="password"
                            name="password"
                            id={`${uniqId}-password`}
                        />

                        <label htmlFor={`${uniqId}-password`}>Пароль</label>
                    </div>

                    <div className="row">
                        <Button type="submit" isLoading={loading}>
                            Продолжить
                        </Button>
                    </div>
                </Form>
            </Formik>
        </React.Fragment>
    )
}

export default connect(
    state => ({
        user: userSelector(state),
        loading: authLoadingSelector(state),
    }),
    {
        register,
        fetchUser: loadUser,
        fetchUsers: loadUsers,
    }
)(AccountCreate)
