'use client';

import { FC, useState } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import HeroBanner from './components/Route/HeroBanner';
import PartnersBanner from './components/Route/PartnersBanner';

interface Props {}

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState('Login');

    return (
        <div>
            <Heading
                title="EduHub"
                description="EduHub is a platform for students to learn and get help from teachers"
                keywords="Programming, React, Redux, Machine Learning, Python"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <HeroBanner />
            <PartnersBanner />
        </div>
    );
};

export default Page;
