import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Loading } from '../../components/utils/Loading';
import { UserProfile } from '../../components/user/UserProfile';

export const User = () => {
    const { user, loading } = useContext(UserContext);

    if(loading || !user){
      return <Loading/>
    }

  return (
    <div className='bg-gradient-to-r from-blue-50 to-blue-100 py-14'>
        <UserProfile user={user} />
    </div>
  )
}
