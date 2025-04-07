import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { createClub, updateClub } from '../../api/clubApi'
import { useNavigate, useParams } from 'react-router-dom'
import { getCountries } from '../../api/countryApi'
import { Loading } from '../utils/Loading'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getClubs } from '../../api/clubApi'

const getValidationSchema = (clubs, currentClubId) =>
  Yup.object({
    name: Yup.string()
      .max(100, 'Debe tener 100 caracteres o menos')
      .required('Requerido')
      .test(
        'unique-name',
        'Ya existe un club con este nombre',
        function (value) {
          if (!value || !clubs) return true; 
          return !clubs.some(
            (club) =>
              club.name.toLowerCase() === value.toLowerCase() &&
              club.id !== currentClubId 
          );
        }
      ),
    location: Yup.string()
      .max(100, 'Debe tener 100 caracteres o menos')
      .required('Requerido'),
    country: Yup.string().required('Requerido'),
    established: Yup.date().required('Requerido'),
    logo: currentClubId  
      ? Yup.mixed().nullable()
      : Yup.mixed().required('El escudo del club es requerido'),
    description: Yup.string(),
    email: Yup.string().email('Email inválido').required('Requerido').nullable(),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Debe tener 10 dígitos')
      .required('Requerido'),
    active: Yup.boolean().required('Requerido'),
  });

export const ClubForm = ({ isUpdating }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentClub } = useSelector(state => state.clubs)
  const { clubs } = useSelector(state => state.clubs)
  const [currentLogo, setCurrentLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null); 
  const [countries, setCountries] = useState([])

  const [initialValues, setInitialValues] = useState({
    name: '',
    location: '',
    country: "",
    established: '',
    logo: null,
    description: '',
    email: '',
    phone: '',
    active: true,
  })

  
  useEffect(() => {
    if (isUpdating && currentClub) {
      setInitialValues({
        name: currentClub.name,
        location: currentClub.location,
        country: currentClub.country.id,
        established: currentClub.established,
        logo: null,
        description: currentClub.description,
        email: currentClub.email,
        phone: currentClub.phone,
        active: currentClub.active
      })
      setCurrentLogo(currentClub.logo || null)
    }
  }, [isUpdating, currentClub])

  useEffect(() => {
    if (initialValues.logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
      };
      reader.readAsDataURL(initialValues.logo);
    } else {
      setPreviewLogo(null);
    }
  }, [initialValues.logo]);

  useEffect(() => {
    const fetchCountries = async() => {
      try{
        const res = await getCountries()
        await dispatch(getClubs())
        setCountries(res)
      }catch(error){
        setError(error)
      }finally{
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if(key !== "logo"){
        formData.append(key, values[key])
      }
    })
    if(values.logo){
      formData.append("logo", values.logo)
    }

    const apiCall = isUpdating
      ? dispatch(updateClub(id, formData))
      : dispatch(createClub(formData))

    apiCall
      .then(() => {
        if (isUpdating && id) {
          navigate(`/clubs/club/${id}`)
        } else {
          navigate(`/clubs`)
        }
        toast.success(isUpdating ? 'Club actualizado con éxito' : 'Club creado con éxito')
      })
      .catch(error => {
        console.error("Error al guardar el club", error)
        toast.error("Error al guardar el club")
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  if (loading) return <Loading/>;

  return ( 
  <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-[Poppins] font-medium mb-8 mt-2 text-left text-gray-800">{isUpdating ? 'Actualiza los datos requeridos' : 'Ingresa los datos requeridos'}</h1>

  <Formik
    initialValues={initialValues}
    validationSchema={getValidationSchema(clubs, isUpdating ? currentClub?.id : null)}
    onSubmit={handleSubmit}
    enableReinitialize={true}
  >
    {({ setFieldValue, isSubmitting }) => (
      <Form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-[Poppins]">

          <div className="mb-4">
            <label htmlFor="name" className="block text-base">Nombre</label>
            <Field
              id="name"
              name="name"
              type="text"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 mt-2 text-sm" />
          </div>

          <div className='mb-4'>
              <label htmlFor="country" className="block text-base font-medium text-gray-700">País de origen</label>
              <Field
                as="select"
                id="country"
                name="country"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              >
                <option value="">Selecciona un país</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="country" component="div" className="text-red-500 mt-2 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-base font-medium text-gray-700">Locación</label>
            <Field
              id="location"
              name="location"
              type="text"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
            />
            <ErrorMessage name="location" component="div" className="text-red-500 mt-2 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="established" className="block text-base font-medium text-gray-700">Fecha de Establecimiento</label>
            <Field
              id="established"
              name="established"
              type="date"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
            />
            <ErrorMessage name="established" component="div" className="text-red-500 mt-2 text-sm" />
          </div>

          <div className="mb-4">
                <label htmlFor="logo" className="block text-base font-medium text-gray-700">Escudo</label>
                {/* Mostrar previsualización de la imagen */}
                {previewLogo && (
                  <div className="mb-4">
                    <img src={previewLogo} alt="Preview logo" className="h-24 w-24 object-cover rounded-md shadow-lg" />
                  </div>
                )}
                {currentLogo && !previewLogo && (
                  <div className="mb-4">
                    <img src={currentLogo} alt="Current logo" className="h-24 w-24 object-cover rounded-md shadow-lg" />
                    <p className="text-sm text-gray-600">Archivo actual: {currentLogo.split('/').pop()}</p>
                  </div>
                )}
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('logo', event.currentTarget.files[0])
                    setPreviewLogo(URL.createObjectURL(event.currentTarget.files[0]))
                  }}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
                />
                <ErrorMessage name="logo" component="div" className="text-red-500 mt-2 text-sm" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-base font-medium text-gray-700">Descripción</label>
            <Field
              id="description"
              name="description"
              as="textarea"
              rows="3"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 mt-2 text-sm" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 mt-2 text-sm" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-base font-medium text-gray-700">Teléfono</label>
            <Field
              id="phone"
              name="phone"
              type="text"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 mt-2 text-sm" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="active" className="block text-base font-medium">Activo</label>
            <Field
              id="active"
              name="active"
              type="checkbox"
              className="mt-2 h-7 w-6 border-gray-300 rounded "
            />
            <ErrorMessage name="active" component="div" className="text-red-500 mt-2 text-sm" />
          </div>

        </div>

        <div className="flex justify-center gap-3 font-[Poppins]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors"
          >
            {isSubmitting ? (isUpdating ? 'Actualizando...' : 'Creando...') : (isUpdating ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </Form>
    )}
  </Formik>
  <button className='bg-red-600 mt-5 px-4 py-2 rounded-lg text-white font-semibold transition-colors'>
    <NavLink to={isUpdating ? `/clubs/club/${currentClub?.id}` : `/clubs`}>
      Cancelar
    </NavLink>
  </button>
</div>
  )
}


