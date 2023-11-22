import React, { useEffect, useState } from 'react';
import "./App.css"
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(3, 'The length of name form should be minimum 3').max(15, 'The length of name form should be maximum 15').required('Name form Should not be empty, Please enter name!'),
  surname: Yup.string().min(3, 'The length of anme form should be min 3').max(15, 'The length of name form should be maximum 15').required('Name form Should not be empty, Please enter name!'),
  email: Yup.string().email('Enter Correct Email Form!!').max(25, "The length of email form should be maximum 15").required('Email form Should not be empty, Please enter Email!'),
  password: Yup.string().min(8, 'The length of password form should be minimum 8')
})

const App = () => {
  const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  function setLocal(values) {
    setUser(previosUser => {
      const newUser = { ...previosUser, ...values };
      return newUser;
    });
  }

  return (
    <Formik
      initialValues={{
        name: '',
        surname: '',
        email:  '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => { setLocal(values) }}>
      {({ errors, touched, isValidating }) => (
        <Form >
          <h1>Sign up</h1>

          <label>Name</label>
          <Field className='input' type='text' name="name" placeholder="Enter name..." />
          {errors.name && touched.name && <div className="error-message">{errors.name}</div>}

          <label>Surname</label>
          <Field className='input' type='text' name="surname" placeholder="Enter surname..." />
          {errors.surname && touched.surname && <div className="error-message">{errors.surname}</div>}

          <label>E-mail</label>
          <Field className='input' type='text' name="email" placeholder="Enter email..." />
          {errors.email && touched.email && <div className="error-message">{errors.email}</div>}

          <label>Password</label>
          <Field className='input' type='text' name="password" placeholder="Enter password..." />
          {errors.password && touched.password && <div className="error-message">{errors.password}</div>}

          <button disabled={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0 || isValidating} className={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0 || isValidating ? 'disabled-button' : 'enabled-button'} type='submit'>Submit</button>
          <p>Already registered <span style={{color:"blue"}}>Sign in?</span></p>
        </Form>
      )}
    </Formik>
  )
}
export default App