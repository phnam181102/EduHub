'use client';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import avatar from '@/public/assets/avatar.png';

import NavItems from '../utils/NavItems';
import SearchBar from './SearchBar';
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const { user } = useSelector((state: any) => state.auth);
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

    useEffect(() => {
        if (!user) {
            if (data) {
                socialAuth({
                    email: data?.user?.email,
                    name: data?.user?.name,
                    avatar: data?.user?.image,
                });
            }
        }
        if (isSuccess) {
            toast.success('Login successfully');
        }
    }, [data, socialAuth, user]);

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 85) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    const handleClose = (e: any) => {
        if (e.target.id === 'screen') {
            {
                setOpenSideBar(false);
            }
        }
    };

    return (
        <div className="w-full relative">
            <div
                className={`${
                    active
                        ? 'fixed top-0 left-0 w-full h-[80px] z-[80] border-b shadow-xl bg-white transition duration-500'
                        : 'w-full border-b h-[80px] z-[80] shadow-xl'
                }`}
            >
                <div className="w-[95%] m-auto py-3 h-full flex items-center">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={'/'}
                                className={`text-[25px] font-Poppins font-[600] text-gray-800 flex items-center`}
                            >
                                <Image
                                    className="mr-2"
                                    src={require('@/public/assets/logo.png')}
                                    width={50}
                                    height={50}
                                    alt="EduHub"
                                />
                                EduHub
                            </Link>
                        </div>

                        <SearchBar />

                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />

                            {/* Only for mobile */}
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer text-black"
                                    onClick={() => setOpenSideBar(true)}
                                />
                            </div>

                            {user ? (
                                <Link href={'/profile'} className="ml-2 p-1">
                                    <Image
                                        src={
                                            user.avatar
                                                ? require('@/public/assets/avatar.png')
                                                : require('@/public/assets/avatar.png')
                                        }
                                        alt="Avatar"
                                        className="w-[28px] h-[28px] rounded-full cursor-pointer"
                                    />
                                </Link>
                            ) : (
                                <HiOutlineUserCircle
                                    size={25}
                                    className="hidden 800px:block cursor-pointer text-black ml-3"
                                    onClick={() => setOpen(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile sidebar */}
                {openSideBar && (
                    <div
                        className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024]"
                        onClick={handleClose}
                        id="screen"
                    >
                        <div className="fixed w-[70%] z-[99999999] h-screen bg-white top-0 right-0">
                            <NavItems activeItem={activeItem} isMobile={true} />

                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer ml-5 my-2 text-black "
                                onClick={() => setOpen(true)}
                            />

                            <br />
                            <br />

                            <p className="text-[16px] px-2 pl-5 text-black ">
                                Copyright &copy; 2024 EduHub
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* MODALS */}
            {route === 'Login' && (
                <>
                    {open && (
                        <CustomModal
                            open={open}
                            setOpen={setOpen}
                            setRoute={setRoute}
                            activeItem={setActive}
                            component={Login}
                        />
                    )}
                </>
            )}
            {route === 'Sign-Up' && (
                <>
                    {open && (
                        <CustomModal
                            open={open}
                            setOpen={setOpen}
                            setRoute={setRoute}
                            activeItem={setActive}
                            component={SignUp}
                        />
                    )}
                </>
            )}
            {route === 'Verification' && (
                <>
                    {open && (
                        <CustomModal
                            open={open}
                            setOpen={setOpen}
                            setRoute={setRoute}
                            activeItem={setActive}
                            component={Verification}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Header;
