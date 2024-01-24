//tsrafce
'use client';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';

import NavItems from '../utils/NavItems';
import SearchBar from './SearchBar';
import Image from 'next/image';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
};

const Header: FC<Props> = ({ activeItem, setOpen }) => {
    const [active, setActive] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);

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
                                    src={require('../../public/assets/logo.png')}
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

                            <HiOutlineUserCircle
                                size={25}
                                className="hidden 800px:block cursor-pointer text-black ml-3"
                                onClick={() => setOpen(true)}
                            />
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
        </div>
    );
};

export default Header;
