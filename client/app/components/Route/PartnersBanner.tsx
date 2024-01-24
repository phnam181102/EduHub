import Image from 'next/image';
import React, { FC } from 'react';

type Props = {};

const PartnersBanner: FC<Props> = (props) => {
    return (
        <div className=" bg-gray-50">
            <div className="w-full max-w-[84rem] mt-[3.2rem] px-10 mx-auto">
                <div className="p-14 text-center text-gray-600 text-xl">
                    <h2 className="mb-8">
                        Trusted by over 15,000 companies and millions of
                        learners around the world
                    </h2>
                    <ul className="1100px:flex 1100px:justify-between grid grid-cols-4 gap-4 items-center justify-items-center">
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/volkswagen.svg"
                                alt="Volkswagen logo"
                                width="48"
                                height="48"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/samsung.svg"
                                alt="Samsung logo"
                                width="101"
                                height="34"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/cisco.svg"
                                alt="Cisco logo"
                                width="87"
                                height="40"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/att.svg"
                                alt="ATT&amp;T logo"
                                width="97"
                                height="40"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/procter_gamble.svg"
                                alt="Procter &amp; Gamble logo"
                                width="48"
                                height="48"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/hewlett_packard_enterprise.svg"
                                alt="Hewlett Packard Enterprise logo"
                                width="94"
                                height="40"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/citi.svg"
                                alt="Citi logo"
                                width="62"
                                height="40"
                                loading="lazy"
                            />
                        </li>
                        <li>
                            <Image
                                src="https://s.udemycdn.com/partner-logos/ou-v1/ericsson.svg"
                                alt="Ericsson logo"
                                width="55"
                                height="48"
                                loading="lazy"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PartnersBanner;
