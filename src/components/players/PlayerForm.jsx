import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCountries } from '../../api/countryApi'
import { getPositions } from '../../api/positionApi'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { Loading } from '../utils/Loading'
import { SkillsModalForm } from './SkillsModalForm'
import * as Yup from 'yup'
import { isBefore, startOfDay } from 'date-fns'
import { createPlayer, createSkills} from '../../api/playersApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const getvalidationSchema = (players) =>  Yup.object({
  first_name: Yup.string().max(15, 'Debe tener 15 caracteres o menos').required('Requerido'),
  last_name: Yup.string().max(15, 'Debe tener 15 caracteres o menos').required('Requerido'),
  date_of_birth: Yup.date().required('Requerido')
  .test('is-valid-date','La fecha no puede ser hoy ni una fecha futura',
    function (value) {
      const today = startOfDay(new Date());
      return value && isBefore(value, today);
    }
  ),
  nationality: Yup.string().required('Requerido'),
  position: Yup.string().required('Requerido'),
  dorsal: Yup.number().min(1, 'Debe ser al menos 1').max(99, 'No puede ser mayor a 99').required("requerido")
  .test(
    'unique-dorsal',
    'Ya existe un jugador con este dorsal',
    function(value){
      return value && !players.some((player) => player.dorsal === value)
    }
  ),
  email: Yup.string().email('Email inválido'),
  phone: Yup.string().length(10, 'El teléfono debe tener 10 números'),
});

export const PlayerForm = () => {

  const { selectedClub, players } = useSelector(state => state.players) //Id club
  const [countries, setCountries] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const [skillsCreated, setSkillsCreated] = useState(false);
  const [previewPlayer, setPreviewPlayer] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if(!selectedClub){
    return <Navigate to={'/players'}/>
  }

  const [initialValues, setInitialValues] = useState({
    club: selectedClub,
    first_name: '',
    last_name: '',
    date_of_birth: '',
    nationality: "",
    position: "",
    photo: null,
    dorsal: 99,
    email: 'jugador@example.com',
    phone: '',
    active: true
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    for (const key in values) {
      if (key === 'photo') {
        if (values.photo) {
          formData.append('photo', values.photo);
        }
      } else if (key === 'club' || key === 'nationality' || key === 'position' || key === 'dorsal') {
        formData.append(key, parseInt(values[key], 10));
      } else {
        formData.append(key, values[key] || '');
      }
    }
    
    try {
      const response = await dispatch(createPlayer(formData));
      setPreviewPlayer(response);
      setPlayerId(response.id);
      setShowModal(true);
    } catch (error) {
      console.error('Error del servidor:', error.response?.data || error.message);
      toast.error('Error al crear el jugador');
    } finally{
      setSubmitting(false);
    }
  };
  
  const handleSaveSkills = async (skills) => {
    const skillData = {...skills, player: playerId}
    const formData = new FormData();

    for (const key in skillData) {
        formData.append(key, skillData[key]);
    }

    try{
      await dispatch(createSkills(formData))
      setSkillsCreated(true)
      navigate('/players')
      toast.success('Jugador y habilidades creadas!')
    }catch(error){
      console.error("error de skills")
      toast.error('Error al crear skills')
    }
  };

  useEffect(() => {
    const fetchCountriesAndPositions = async() => {
      try{
        const [res_countries, res_positions] = await Promise.all([getCountries(), getPositions()]);
        setCountries(res_countries)  
        setPositions(res_positions)  
      }catch(error){
        setError(error)
      }finally{
        setLoading(false)
      }
    }
    fetchCountriesAndPositions()
  }, [])
  
  useEffect(() => {
    if(initialValues.photo){
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result)
      }
      reader.readAsDataURL(initialValues.photo)
    }else{
      setPreviewPhoto(null)
    }
  }, [initialValues.photo])

  useEffect(() => {
    let isNavigating = false;
    const handleBeforeUnload = async() => {
      if (playerId && !skillsCreated && !isNavigating) {
        try {
          await handleSaveSkills({
            passing: 0,
            shooting: 0,
            dribbling: 0,
            defense: 0,
            physical: 0,
            speed: 0,
            vision: 0,
            goalkeeping: 0,
          });
        } catch (error) {
          console.error('Error al crear habilidades predeterminadas:', error);
        }
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      isNavigating = true;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playerId, skillsCreated]);
  
  if (loading) return <Loading/>;

  return (
    <div className="container font-[Poppins] mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-medium mb-8 mt-2 text-left text-gray-800">Crear jugador</h1>  
      <Formik
        initialValues={initialValues}
        validationSchema={getvalidationSchema(players)}
        onSubmit={handleSubmit}
      >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className='mb-4'>
              <label htmlFor="first_name" className="block text-base">Nombre:</label>
              <Field
                id="first_name"
                name="first_name"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="first_name" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className='mb-4'>
              <label htmlFor="last_name" className="block text-base">Apellido:</label>
              <Field
                id="last_name"
                name="last_name"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="last_name" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className='mb-4'>
              <label htmlFor="date_of_birth" className="block text-base font-medium text-gray-700">Fecha de nacimiento</label>
              <Field
                id='date_of_birth'
                name='date_of_birth'
                type='date'
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="date_of_birth" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className='mb-4'>
              <label htmlFor="photo"  className="block text-base font-medium text-gray-700 mb-2">Foto de jugador</label>
              {previewPhoto && (
                <div className='mb-4'>
                  <img src={previewPhoto} alt="Preview photo" className="h-24 w-24 object-cover rounded-md shadow-lg"/>
                </div>
              )}
              <input 
                id='photo'
                name='photo'
                type="file" 
                onChange={(e) => {
                  setFieldValue('photo', e.currentTarget.files[0])
                  setPreviewPhoto(URL.createObjectURL(e.currentTarget.files[0]))
                }}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
                />
            </div>

            <div className='mb-4'>
              <label htmlFor="nationality" className="block text-base font-medium text-gray-700">Nacionalidad</label>
              <Field
                as="select"
                id="nationality"
                name="nationality"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              >
                <option value="">Selecciona un país</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="nationality" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className='mb-4'>
              <label htmlFor="position" className="block text-base font-medium text-gray-700">Posición</label>
              <Field
                as="select"
                id="position"
                name="position"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              >
                <option value="">Selecciona una posición</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.description}
                  </option>
                ))}
                </Field>
                <ErrorMessage name="position" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className='mb-4'>
              <label htmlFor="dorsal" className="block text-base font-medium text-gray-700">Dorsal</label>
              <Field
                id='dorsal'
                name='dorsal'
                type='number'
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="dorsal" component="div" className="text-red-500 mt-2 text-sm" />
            </div>  

            <div className='mb-4'>
              <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
              <Field
                id='email'
                name='email'
                type='email'
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-2 text-sm" />
            </div>         

            <div className='mb-4'>
              <label htmlFor="phone" className="block text-base font-medium text-gray-700">Teléfono</label>
              <Field
                id='phone'
                name='phone'
                type='phone'
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 mt-2 text-sm" />
            </div>        

            <div className="mb-4">
              <label htmlFor="active" className="block text-base font-medium">Estado</label>
              <Field
                id="active"
                name="active"
                type="checkbox"
                className="mt-2 h-7 w-6 border-gray-300 rounded "
              />
          </div>

          </div>

          <div className="flex justify-center gap-3">
            <button
              type='submit'
              className={`px-4 py-2 bg-indigo hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >Guardar</button>
          </div>
        </Form>
      )}

      </Formik>
      <SkillsModalForm
      show={showModal}
      onClose={() => setShowModal(false)}
      playerId={playerId}
      player={previewPlayer}
      onSave={handleSaveSkills}
      />
    </div>
  )
}



