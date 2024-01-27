import { styles } from '@/app/styles/styles';
import { useUpdatePasswordMutation } from '@/redux/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {};

const ChangePassword: FC<Props> = (props) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState({
        currentPw: false,
        newPw: false,
        confirmPw: false,
    });
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

    const passwordChangeHandler = async (e: any) => {
        e.preventDefault();

        if (newPassword !== confirmPassword)
            toast.error('Passwords do not match');
        else await updatePassword({ currentPassword, newPassword });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        if (error) {
            if ('data' in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [error, isSuccess]);

    return (
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
            <h1 className="block text-[28px] 800px:text-[30px] font-Poppins text-center font-[700] text-black pb-2">
                Change Password
            </h1>

            <div className="800px:w-[50%] m-auto block">
                <form
                    aria-required
                    onSubmit={passwordChangeHandler}
                    className="flex flex-col items-center"
                >
                    <div className="w-[100%] mt-5">
                        <label className="block text-lg  text-black">
                            Enter current password
                        </label>
                        <div className="w-full relative">
                            <input
                                type={
                                    !showPassword.currentPw
                                        ? 'password'
                                        : 'text'
                                }
                                className={`${styles.input} !w-[95%] mb-2 800px:mb-2 !mt-1 pl-5`}
                                required
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                            {!showPassword.currentPw ? (
                                <AiOutlineEyeInvisible
                                    className="absolute bottom-5 right-10 z-1 cursor-pointer text-black"
                                    size={22}
                                    onClick={() =>
                                        setShowPassword((current) => {
                                            return {
                                                ...current,
                                                currentPw: true,
                                            };
                                        })
                                    }
                                />
                            ) : (
                                <AiOutlineEye
                                    className="absolute bottom-5 right-10 z-1 cursor-pointer text-black"
                                    size={22}
                                    onClick={() =>
                                        setShowPassword((current) => {
                                            return {
                                                ...current,
                                                currentPw: false,
                                            };
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-[100%]  mt-2">
                        <label className="block text-lg  text-black">
                            Enter new password
                        </label>
                        <div className="w-full relative">
                            <input
                                type={!showPassword.newPw ? 'password' : 'text'}
                                className={`${styles.input} !w-[95%] mb-2 800px:mb-2 !mt-1 pl-5`}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {!showPassword.newPw ? (
                                <AiOutlineEyeInvisible
                                    className="absolute bottom-5 right-10 z-1 cursor-pointer text-black"
                                    size={22}
                                    onClick={() =>
                                        setShowPassword((current) => {
                                            return { ...current, newPw: true };
                                        })
                                    }
                                />
                            ) : (
                                <AiOutlineEye
                                    className="absolute bottom-5 right-10 z-1 cursor-pointer text-black"
                                    size={22}
                                    onClick={() =>
                                        setShowPassword((current) => {
                                            return { ...current, newPw: false };
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-[100%] mt-2">
                        <label className="block text-lg  text-black">
                            Re-type new password
                        </label>
                        <div className="w-full relative">
                            <input
                                type={
                                    !showPassword.confirmPw
                                        ? 'password'
                                        : 'text'
                                }
                                className={`${styles.input} !w-[95%] mb-2 800px:mb-2 !mt-1 pl-5`}
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            {!showPassword.confirmPw ? (
                                <AiOutlineEyeInvisible
                                    className="absolute bottom-5 right-10 z-1 cursor-pointer text-black"
                                    size={22}
                                    onClick={() =>
                                        setShowPassword((current) => {
                                            return {
                                                ...current,
                                                confirmPw: true,
                                            };
                                        })
                                    }
                                />
                            ) : (
                                <AiOutlineEye
                                    className="absolute bottom-5 right-10 z-1 cursor-pointer text-black"
                                    size={22}
                                    onClick={() =>
                                        setShowPassword((current) => {
                                            return {
                                                ...current,
                                                confirmPw: false,
                                            };
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <input
                        type="submit"
                        required
                        value="Change password"
                        className={`w-full 800px:w-[200px] tracking-wide h-[45px] self-start border border-[#4d1ef9] bg-[#4d1ef9] text-center text-lg text-white font-bold rounded-[3px] mt-8 cursor-pointer hover:shadow-xl hover:bg-[#3b1ef9] ease-linear duration-200`}
                    />
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
