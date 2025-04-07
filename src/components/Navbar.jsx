import React, { useState, useEffect, useContext } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { UserContext } from '../context/userContext'
import { DropDown } from './DropDown';
import { Loading } from './utils/Loading';
import logo from '../assets/img/logoapp.png';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { user, loading } = useContext(UserContext);
    
    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    
    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const onToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };  
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    if (loading){
        return(
            <Loading/>
        )
    }

  return (
    <header className='bg-white font-[Poppins] fixed top-0 left-0 w-full z-10 shadow-md'>
        <nav className='flex justify-between items-center w-[92%] mx-auto py-2'>
            <div>
                <img className='w-14' src={logo} alt="logo"/>
            </div>
            <div className={`md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${isMenuOpen ? 'top-[70px] md:top-0' : 'top-[-550%]'} ease-out md:w-auto w-full flex items-center px-5 transition-all duration-200`}>
            <ul className='font-semibold flex md:flex-row flex-col md:items-center md:gap-12 gap-8'>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ?  'hover:text-gray-500 text-indigo border-b-2 border-indigo' : 'hover:text-gray-500'
                        }
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'hover:text-gray-500 text-indigo border-b-2 border-indigo' : 'hover:text-gray-500'
                        }
                        to="clubs"
                        onClick={closeMenu}
                    >
                        Clubs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'hover:text-gray-500 text-indigo border-b-2 border-indigo' : 'hover:text-gray-500'
                        }
                        to="players/"
                        onClick={closeMenu}
                    >
                        Jugadores
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'hover:text-gray-500 text-indigo border-b-2 border-indigo' : 'hover:text-gray-500'
                        }
                        to="performances"
                        onClick={closeMenu}
                    >
                        Estadísticas
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'hover:text-gray-500 text-indigo border-b-2 border-indigo' : 'hover:text-gray-500'
                        }
                        to="tournaments"
                        onClick={closeMenu}
                    >
                        Torneos
                    </NavLink>
                </li>
            </ul>
            </div>
            <div className='flex items-center gap-6'>
                {
                    user && (
                        <DropDown onToggleDropdown={onToggleDropdown} user={user} dropdownRef={dropdownRef} isDropdownOpen={isDropdownOpen}/>
                    )
                }
                {isMenuOpen 
                    ? 
                    <IoMdCloseCircleOutline onClick={() => onToggleMenu()} className='text-3xl cursor-pointer md:hidden'/>
                    :
                    <GiHamburgerMenu onClick={() => onToggleMenu()} className='text-3xl cursor-pointer md:hidden'/>
                }
            </div>
        </nav>
    </header>
  )
}





