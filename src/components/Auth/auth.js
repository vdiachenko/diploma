import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { auth, loadUser, loadUsers } from '../../ac'
import { userSelector, authLoadingSelector } from '../../selectors'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AccountCreate } from '../Account'
import axios from 'axios'
import { getGreetingName } from '../../utils'
import Page from '../Page'
import Button from '../Button'
import styles from './auth.module.css'

const initialValues = {
    code: '',
    password: '',
}

function Auth({ user, loading, fetchUser, auth }) {
    const [newUser, setNewUser] = useState(null)
    const [existingUser, setExistingUser] = useState(null)
    const [uniqId, setUniqId] = useState(null)

    useEffect(() => {
        uniqId === null && setUniqId((Date.now() + Math.random()).toString()) //todo: replace to middlewares
    }, [uniqId])

    function validate(values) {
        let errors = {}

        return errors
    }

    async function authHandler(values) {
        const res = await axios.get(`/api/users/${values.code}`)

        if (!res.data) {
            setNewUser(values)
        } else {
            setExistingUser(res.data)
        }
    }

    function loginHandler(values) {
        if (!values.code || !values.password) {
            return
        }

        auth(values)
    }

    function authBody() {
        return (
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={authHandler}
            >
                <Form className={styles.form}>
                    <div className="row row-code">
                        <Field type="text" name="code" id={`${uniqId}-code`} />

                        <label htmlFor={`${uniqId}-code`}>
                            Индивидуальный номер
                        </label>
                    </div>

                    <div className="row">
                        <Button type="submit" isLoading={loading}>
                            Продолжить
                        </Button>
                    </div>
                </Form>
            </Formik>
        )
    }

    function existingUserBody(user) {
        return (
            <Formik
                initialValues={{
                    code: user.code,
                    password: '',
                }}
                validate={validate}
                onSubmit={loginHandler}
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
                        <small className={styles.greeting}>
                            Войти как: <b>{getGreetingName(user)}</b>
                        </small>
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
        )
    }

    function newUserBody(user) {
        return <AccountCreate {...user} />
    }

    return (
        <Page
            title={
                existingUser !== null && !existingUser
                    ? 'Регистрация'
                    : 'Авторизация'
            }
        >
            <h1 className={styles.title}>Обследуемый</h1>

            {user && <Redirect to="/tests" />}

            {!existingUser && !newUser && authBody()}
            {existingUser && existingUserBody(existingUser)}
            {newUser && newUserBody(newUser)}
        </Page>
    )
}

export default connect(
    state => ({
        user: userSelector(state),
        loading: authLoadingSelector(state),
    }),
    {
        auth,
        fetchUser: loadUser,
        fetchUsers: loadUsers,
    }
)(Auth)
