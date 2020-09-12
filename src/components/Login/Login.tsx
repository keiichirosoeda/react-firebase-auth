import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'

type Props = RouteComponentProps

interface FormValues {
  email: string
  password: string
}

interface Errors {
  email?: string
}

export const Login = ({ history }: Props) => {
  const { login } = useContext(AuthContext)

  const handleSubmit = (values: FormValues) => {
    login(values.email, values.password, history)
  }

  const initialValues: FormValues = { email: '', password: '' }

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validate={(values: FormValues) => {
          const errors: Errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
