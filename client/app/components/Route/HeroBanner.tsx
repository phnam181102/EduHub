import Image from 'next/image';
import React, { FC } from 'react';

type Props = {};

const HeroBanner: FC<Props> = (props) => {
    return (
        <div className="w-full 1000px:flex items-center ">
            <div className="w-full flex items-center justify-center z-10">
                <div className="relative">
                    <Image
                        className="1100px:block"
                        src={
                            'https://img-c.udemycdn.com/notices/web_carousel_slide/image/acfdbd39-ee53-4564-bd3e-b5eb742f610d.jpg'
                        }
                        alt=""
                        width={1340}
                        height={400}
                    />

                    <div className="1100px:absolute top-[6.4rem] left-[7.2rem] 1100px:max-w-md bg-white text-black p-8">
                        <h1 className="font-Merriweather text-[2rem] font-black text-gray-800 leading-snug">
                            International Day of Education
                        </h1>
                        <p className="text-lg leading-snug mt-2">
                            Expand your potential with a course for as little as
                            ₫279,000. Sale ends today.
                        </p>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
