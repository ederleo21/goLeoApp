import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { Loading } from '../utils/Loading';
import { Modal } from '../utils/Modal';
import { useDispatch } from 'react-redux';
import { deleteClub } from '../../api/clubApi';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export const TableClub = React.memo(({ club }) => {

  const { user, loading } = useContext(UserContext);
  const [ showModal, setShowModal ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async() => {
    setShowModal(false)
    try{
      await dispatch(deleteClub(club.id))
      toast.success("Club eliminado lógicamente")
      navigate('/clubs/')
    }catch(error){
      console.log('Error: ', error)
    }
  }

  if(loading){
    return <Loading/>
  }

  return (
    <>
    <div className="max-w-4xl mt-2 bg-gray-50 w-full p-6 shadow-lg rounded-lg mx-auto font-[Poppins]">
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="text-lg font-semibold text-indigo py-2">Nombre oficial:</td>
            <td className="text-lg py-2">{club.name}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">Descripción:</td>
            <td className="text-lg py-2">{club.description}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">País de origen:</td>
            <td className="text-lg py-2">{club.country.name}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">Ubicación:</td>
            <td className="text-lg py-2">{club.location}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">Fecha de fundación:</td>
            <td className="text-lg py-2">{club.established}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">Email de contacto:</td>
            <td className="text-lg py-2">{club.email}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">Teléfono de contacto:</td>
            <td className="text-lg py-2">{club.phone}</td>
          </tr>
          <tr className="border-b">
            <td className="text-lg font-semibold py-2">Estado:</td>
            <td className="text-lg py-2">{club.active ? (<span className='text-green-800 font-bold'>Activo</span>) : <span className='text-red-700 font-bold'>Inactivo</span>}</td>
          </tr>
        </tbody>
      </table>

      {/* Botones de Actualización y Eliminación */}
      <div className="flex gap-2 mt-4">
        { user.permissions.change_club &&
        <NavLink to={`update`}>
        <button className="px-4 py-2 bg-indigo hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors"> 
          Actualizar información
        </button>
        </NavLink> }
        { user.permissions.delete_club &&
          <button onClick={() => setShowModal(true)} className='bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 font-semibold transition-colors'>
            Eliminar club
          </button> }
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title={`¿Está seguro de eliminar el club ${club.name}?`}
      >
        <p className='mb-4 font-[Poppins] text-white'>{club.name} será eliminado lógicamente.</p>
      </Modal> 
    </div>
    </>
  )
});
