import Image from 'next/image';
import React, { FC } from 'react';
import avatarDefault from '@/public/assets/avatar.png';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import {
    MdLogout,
    MdOutlineAccountCircle,
    MdOutlineAdminPanelSettings,
} from 'react-icons/md';
import { BiBook } from 'react-icons/bi';
import Link from 'next/link';

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
    user,
    active,
    avatar,
    setActive,
    logOutHandler,
}) => {
    return (
        <div className="w-full">
            <div
                className={`w-full flex items-center px-8 py-4 my-1 cursor-pointer ${
                    active === 1
                        ? 'bg-white *:fill-[#4d1ef9] text-[#4d1ef9]'
                        : 'bg-transparent text-black'
                }`}
                onClick={() => setActive(1)}
            >
                <div className="w-[25px]">
                    <MdOutlineAccountCircle size={22} />
                </div>

                <h5 className="pl-2 800px:block hidden font-Poppins">
                    My Account
                </h5>
            </div>

            <div
                className={`w-full flex items-center px-8 py-4 my-1 cursor-pointer ${
                    active === 2
                        ? 'bg-white *:fill-[#4d1ef9] text-[#4d1ef9]'
                        : 'bg-transparent text-black'
                }`}
                onClick={() => setActive(2)}
            >
                <div className="w-[25px]">
                    <RiLockPasswordLine size={21} />
                </div>
                <h5 className="pl-2 800px:block hidden font-Poppins ">
                    Change Password
                </h5>
            </div>

            <div
                className={`w-full flex items-center px-8 py-4 my-1 cursor-pointer ${
                    active === 3
                        ? 'bg-white *:fill-[#4d1ef9] text-[#4d1ef9]'
                        : 'bg-transparent text-black'
                }`}
                onClick={() => setActive(3)}
            >
                <div className="w-[25px]">
                    <BiBook size={20} />
                </div>
                <h5 className="pl-2 800px:block hidden font-Poppins ">
                    Enrolled Courses
                </h5>
            </div>

            {user.role === 'admin' && (
                <Link
                    className={`w-full flex items-center px-8 py-4 my-1 cursor-pointer ${
                        active === 3
                            ? 'bg-white *:fill-[#4d1ef9] text-[#4d1ef9]'
                            : 'bg-transparent text-black'
                    }`}
                    href={'/admin'}
                >
                    <div className="w-[25px]">
                        <MdOutlineAdminPanelSettings size={22} />
                    </div>
                    <h5 className="pl-2 800px:block hidden font-Poppins ">
                        Admin Dashboard
                    </h5>
                </Link>
            )}

            <div
                className={`w-full flex items-center px-8 py-4 my-1 cursor-pointer ${
                    active === 4
                        ? 'bg-white *:fill-[#4d1ef9] text-[#4d1ef9]'
                        : 'bg-transparent text-black'
                }`}
                onClick={() => logOutHandler()}
            >
                <div className="w-[25px] pl-[2px]">
                    <MdLogout size={21} />
                </div>
                <h5 className="pl-2 800px:block hidden font-Poppins ">
                    Log Out
                </h5>
            </div>
        </div>
    );
};

export default SideBarProfile;
