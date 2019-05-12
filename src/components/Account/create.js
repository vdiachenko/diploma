import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'

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

function AccountCreate() {
    const [uniqId, setUniqId] = useState(null)

    useEffect(() => {
        setUniqId((Date.now() + Math.random()).toString())
    }, [])

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                let errors = {}

                // for (values of value) {

                // }

                // if (!values.email) {
                //   errors.email = 'Required';
                // } else if (
                //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                //   errors.email = 'Invalid email address';
                // }
                return errors
            }}
            onSubmit
        >
            <Form>
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
                        <label htmlFor={`${uniqId}-gender-male`}>Мужской</label>
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
                        <option value="" />
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

                    <label htmlFor={`${uniqId}-education`}>Образование</label>
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
            </Form>
        </Formik>
    )
}

export default AccountCreate
