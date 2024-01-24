import React from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {};

const SearchBar = (props: Props) => {
    return (
        <div className="hidden 800px:block 1500px:w-[45%] 1100px:w-[45%] w-[30%] h-[48px] bg-transparent relative rounded-full overflow-hidden border border-black">
            <input
                type="search"
                placeholder="Search for anything"
                className="bg-transparent border rounded-full p-2 w-full h-full outline-none pl-14 caret-gray-600 text-black placeholder-gray-500"
            />
            <div className="absolute flex items-center justify-center w-[30px] cursor-not-allowed h-[48px] left-0 top-0 bg-transparent mx-3">
                <BiSearch className="text-gray-500" size={22} />
            </div>
        </div>
    );
};

export default SearchBar;
