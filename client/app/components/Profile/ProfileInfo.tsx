import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import avatarDefault from '@/public/assets/avatar-lg.png';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '@/app/styles/styles';
import { useUpdateAvatarMutation } from '@/redux/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
    avatar: string | null;
    user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [loadUser, setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result;
                updateAvatar(avatar);
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (isSuccess) {
            setLoadUser(true);
        }
        if (error) {
            console.log(error);
        }
    }, [error, isSuccess]);

    const handleSubmit = async (e: any) => {
        console.log('submit');
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="relative">
                    <Image
                        src={
                            user.avatar || avatar
                                ? user.avatar.url || avatar
                                : avatarDefault
                        }
                        width={120}
                        height={120}
                        alt="Avatar"
                        className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#4d1ef9] rounded-full"
                    />

                    <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[30px] bg-gray-800 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer py-1">
                            <AiOutlineCamera size={20} className="z-1" />
                        </div>
                    </label>
                </div>
            </div>

            <br />
            <br />

            <div className="w-full pl-6 800px:pl-10 text-black">
                <form onSubmit={handleSubmit}>
                    <div className="800px:w-[50%] m-auto block pb-4">
                        <div className="w-[100%]">
                            <label
                                className="block pb-2  text-lg font-semibold"
                                htmlFor="name"
                            >
                                Full name
                            </label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-4 mt-0 pl-5`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="w-[100%] pt-2">
                            <label className="block pb-2 text-lg font-semibold">
                                Email address
                            </label>
                            <input
                                type="email"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-4 mt-0 pl-5`}
                                required
                                value={user?.email}
                            />
                        </div>
                        <input
                            className={`w-full 800px:w-[250px] h-[40px] border border-[#4d1ef9] bg-[#4d1ef9] text-center text-lg text-white font-semibold rounded-[3px] mt-8 cursor-pointer`}
                            required
                            value="Update"
                            type="submit"
                        />
                    </div>
                </form>
                <br />
            </div>
        </>
    );
};

export default ProfileInfo;
