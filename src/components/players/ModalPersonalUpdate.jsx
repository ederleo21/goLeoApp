import React, { useEffect, useState } from 'react'
import { ModalUpdatePLayer } from './ModalUpdatePLayer'
import { Field, Form, Formik, ErrorMessage } from 'formik' 
import * as Yup from 'yup'
import { Loading } from '../utils/Loading'
import { useDispatch } from 'react-redux'
import { updatePlayerPersonalData } from '../../api/playersApi'
import toast from 'react-hot-toast'
import { getCountries } from '../../api/countryApi'
import { getPositions } from '../../api/positionApi'
import { getPlayerById } from '../../api/playersApi'

const getValidationSchema = (players, currentPlayerId) => Yup.object({
    first_name: Yup.string().max(15, 'Debe tener 15 caracteres o menos').required('Requerido'),
    last_name: Yup.string().max(15, 'Debe tener 15 caracteres o menos').required('Requerido'),
    date_of_birth: Yup.date().required('Requerido')
      .test('is-valid-date', 'La fecha no puede ser hoy ni una fecha futura', function(value) {
        const today = new Date();
        return value && value < today;
      }),
    nationality: Yup.string().required('Requerido'),
    position: Yup.string().required('Requerido'),
    dorsal: Yup.number().min(1, 'Debe ser al menos 1').max(99, 'No puede ser mayor a 99').required('Requerido')
    .test(
      'unique-dorsal',
      'Ya existe un jugador con este dorsal',
      function (value) {
        return (
          value &&
          !players.some(
            (player) =>
              player.dorsal === value && player.id !== currentPlayerId
          )
        );
      }
    ),
    email: Yup.string().email('Email inválido'),
    phone: Yup.string().length(10, 'El teléfono debe tener 10 números'),
})

export const ModalPersonalUpdate = ({ isOpen, onClose, player, players }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState(false);
    const [positions, setPositions] = useState(false);
    const [initialValues, setInitialValues] = useState({
        club: player.club.id,
        first_name: '',
        last_name: '', 
        date_of_birth: '',
        nationality: '',
        position: '',
        dorsal: 99,
        email: '',
        phone: '',
        photo: null,
        active: true
    });
 

    useEffect(() => {
        if(player){
            setInitialValues({
                club: player.club.id,
                first_name: player.first_name,
                last_name: player.last_name,
                date_of_birth: player.date_of_birth,
                nationality: player.nationality.id,
                position: player.position.id,
                dorsal: player.dorsal,
                email: player.email,
                phone: player.phone,
                photo: player.photo,
                active: player.active
              });
            }
          }, [player]);
          
    const handleSubmit = async (values) => {
      const formData = new FormData();
    
      for (const key in values) {
        if (key === 'photo') {
          if (values.photo instanceof File || values.photo instanceof Blob) {
            formData.append('photo', values.photo);
          }
        } else if (key === 'active') {
          formData.append('active', values.active ? 'true' : 'false'); 
        } else if (['club', 'nationality', 'position', 'dorsal'].includes(key)) {
          formData.append(key, parseInt(values[key], 10));
        } else {
          formData.append(key, values[key] || '');
        }
      }
    
      setLoading(true);
    
      try {
        const updatedPlayer = await dispatch(updatePlayerPersonalData(player.id, formData));
        toast.success('Datos del jugador actualizados con éxito');
        await dispatch(getPlayerById(player.id))
        onClose();
      } catch (error) {
        console.error('Error del servidor:', error.response?.data || error.message);
        toast.error('Error al actualizar los datos del jugador');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        const fetchCountriesAndPositions = async () => {
            try {
                const [res_countries, res_positions] = await Promise.all([getCountries(), getPositions()]);
                setCountries(res_countries);  
                setPositions(res_positions);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountriesAndPositions();
    }, []);

    if (loading) return <Loading/>;

    return (
<ModalUpdatePLayer isOpen={isOpen} onClose={onClose} title="Datos personales">
  <Formik
    initialValues={initialValues}
    validationSchema={getValidationSchema(players, player.id)}
    onSubmit={handleSubmit}
  >
    {({ setFieldValue }) => (
      <Form>
        {/* Contenedor responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Nombre */}
          <div>
            <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">Nombre</label>
            <Field
              id="first_name"
              name="first_name"
              type="text"
              className="input p-2 border rounded-md w-full mt-2"
              placeholder="Nombre"
            />
            <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">Apellido</label>
            <Field
              id="last_name"
              name="last_name"
              type="text"
              className="input p-2 border rounded-md w-full mt-2"
              placeholder="Apellido"
            />
            <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-semibold text-gray-700">Fecha de nacimiento</label>
            <Field
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              className="input p-2 border rounded-md w-full mt-2"
            />
            <ErrorMessage name="date_of_birth" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Nacionalidad */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-semibold text-gray-700">Nacionalidad</label>
            <Field
              id="nationality"
              name="nationality"
              as="select"
              className="input p-2 border rounded-md w-full mt-2"
            >
              <option value="">Seleccionar</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </Field>
            <ErrorMessage name="nationality" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Posición */}
          <div>
            <label htmlFor="position" className="block text-sm font-semibold text-gray-700">Posición</label>
            <Field
              id="position"
              name="position"
              as="select"
              className="input p-2 border rounded-md w-full mt-2"
            >
              <option value="">Seleccionar</option>
              {positions.map(position => (
                <option key={position.id} value={position.id}>{position.description}</option>
              ))}
            </Field>
            <ErrorMessage name="position" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Dorsal */}
          <div>
            <label htmlFor="dorsal" className="block text-sm font-semibold text-gray-700">Dorsal</label>
            <Field
              id="dorsal"
              name="dorsal"
              type="number"
              className="input p-2 border rounded-md w-full mt-2"
              placeholder="Número de dorsal"
            />
            <ErrorMessage name="dorsal" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
            <Field
              id="email"
              name="email"
              type="email"
              className="input p-2 border rounded-md w-full mt-2"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Teléfono</label>
            <Field
              id="phone"
              name="phone"
              type="text"
              className="input p-2 border rounded-md w-full mt-2"
              placeholder="Teléfono"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Checkbox: Active */}
          <div className="col-start-1 sm:col-start-2 lg:col-start-3">
            <label htmlFor="active" className="flex items-center text-sm font-semibold text-gray-700 mt-7">
              <Field
                id="active"
                name="active"
                type="checkbox"
                className="mr-2"
              />
              Activo
            </label>
            <ErrorMessage name="active" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Foto */}
          <div className="col-span-full lg:col-span-2">
            <label htmlFor="photo" className="block text-sm font-semibold text-gray-700">Foto</label>
            {initialValues.photo && (
              <div className="mb-2">
                <img
                  src={initialValues.photo}
                  alt="Foto del jugador"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <p className="text-xs text-gray-500">{initialValues.photo.split('/').pop()}</p>
              </div>
            )}
            <input
              id="photo"
              name="photo"
              type="file"
              className="input p-2 border rounded-md w-full mt-2"
              onChange={(e) => setFieldValue("photo", e.target.files[0])}
            />
            <ErrorMessage name="photo" component="div" className="text-red-500 text-xs mt-1" />
          </div>
        </div>

        {/* Botón de enviar */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-indigo font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full max-w-md"
          >
            Actualizar
          </button>
        </div>
      </Form>
    )}
  </Formik>
</ModalUpdatePLayer>
    );
};

