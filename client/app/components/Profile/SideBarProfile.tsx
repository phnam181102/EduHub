import Image from 'next/image';
import React, { FC } from 'react';
import avatarDefault from '@/public/assets/avatar.png';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { MdLogout, MdOutlineAccountCircle } from 'react-icons/md';
import { BiBook } from 'react-icons/bi';

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
                <MdOutlineAccountCircle size={22} />

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
                <RiLockPasswordLine size={20} />
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
                <BiBook size={20} />
                <h5 className="pl-2 800px:block hidden font-Poppins ">
                    Enrolled Courses
                </h5>
            </div>

            <div
                className={`w-full flex items-center px-8 py-4 my-1 cursor-pointer ${
                    active === 4
                        ? 'bg-white *:fill-[#4d1ef9] text-[#4d1ef9]'
                        : 'bg-transparent text-black'
                }`}
                onClick={() => logOutHandler()}
            >
                <MdLogout size={21} />
                <h5 className="pl-2 800px:block hidden font-Poppins ">
                    Log Out
                </h5>
            </div>
        </div>
    );
};

export default SideBarProfile;
