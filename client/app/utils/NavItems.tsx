import Link from 'next/link';
import React, { FC } from 'react';

export const navItemsData = [
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' },
    { name: 'About', url: '/about' },
    { name: 'FAQ', url: '/faq' },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden 800px:flex">
                {navItemsData &&
                    navItemsData.map((i, index) => (
                        <Link href={`${i.url}`} key={index} passHref>
                            <span
                                className={`${
                                    activeItem === index
                                        ? 'text-[#4745e4]'
                                        : 'text-black'
                                } text-[18px] px-4 font-Poppins font-[400]`}
                            >
                                {i.name}
                            </span>
                        </Link>
                    ))}
            </div>
            {isMobile && (
                <div className="800px:hidden mt-5">
                    <div className="w-full text-center py-6">
                        <Link href={'/'} passHref>
                            <span className="text-[25px] font-Poppins font-[500] text-black ">
                                EduHub
                            </span>
                        </Link>
                    </div>

                    {navItemsData &&
                        navItemsData.map((i, index) => (
                            <Link href="/" key={index} passHref>
                                <span
                                    className={`${
                                        activeItem === index
                                            ? 'text-[crimson]'
                                            : 'text-black'
                                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                                >
                                    {i.name}
                                </span>
                            </Link>
                        ))}
                </div>
            )}
        </>
    );
};

export default NavItems;
