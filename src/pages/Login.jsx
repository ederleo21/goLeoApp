import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { toast } from 'react-hot-toast'

export const Login = () => {

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nombre de usuario es requerido"),
    password: Yup.string().required("Contraseña es requerida")
  })

  const handleSubmit = async(values, {setSubmitting}) => {
    try{
      const res = await api.post("/api/token/", {
        username: values.username,
        password: values.password
      })
      if(res.status === 200){
        const { access, refresh } = res.data
        localStorage.setItem(ACCESS_TOKEN, access)
        localStorage.setItem(REFRESH_TOKEN, refresh)
        toast.success(`Inicio de sesión correcto!`, {
          duration: 2000,
          position: 'top-right'
        })
        navigate("/")
      }
    }catch(error){
      if(error.response && error.response.status === 401){
        toast.error("Credenciales inválidas", {
          duration: 1000,
        })
      }else{
        console.error("Error al iniciar sesión")
      }
    }
    setSubmitting(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-4xl font-serif font-bold mb-6 text-center">Iniciar sesión</h1>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <Field 
                type="text" 
                name="username" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
              <ErrorMessage name="username">
                {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <Field 
                type="password" 
                name="password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
              <ErrorMessage name="password">
                {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
              </ErrorMessage>
            </div>
            <button 
              type="submit" 
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={isSubmitting}
            >
              Iniciar sesión
            </button>
          </Form>
        )}
      </Formik>
      <p className='mt-4'>¿No tienes una cuenta? <a href="/register"><span className='font-semibold text-blue-950 underline'>Regístrate</span></a></p>
    </div>
  </div>
  )
}
