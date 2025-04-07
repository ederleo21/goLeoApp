import React, {useContext} from 'react';
import { UserContext } from '../../context/userContext';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast'

export const PermissionRoute = ({ requiredPermissions }) => {

    const {user, loading} = useContext(UserContext)

    if(loading){
        return
    }

    if(!user){
        return <Navigate to={"/login"} />
    }

    const permissions = user.permissions || {};

    const hasPermission = requiredPermissions.every(permission => permissions[permission] === true)

    if(!hasPermission){
        toast.error("You're unathorized");
        return <Navigate to={"/"} />
    }

    return <Outlet/>
}



