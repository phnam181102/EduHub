import { styles } from '@/app/styles/styles';
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import {
    AiFillGithub,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { MdLockOutline } from 'react-icons/md';
import { FaFacebook, FaRegUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import * as Yup from 'yup';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email address'),
    password: Yup.string().required('Please enter your password').min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, error }] = useLoginMutation();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            toast.success('Login successful');
        }

        if (error) {
            if ('data' in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error, setOpen]);

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>Login to your EduHub account</h1>

            <form onSubmit={handleSubmit}>
                <div className="w-full relative ">
                    <FaRegUser
                        className="absolute bottom-4 left-3 z-1 cursor-pointer text-gray-500"
                        size={18}
                    />
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Username or Email "
                        className={`${
                            errors.email && touched.email && 'border-red-500'
                        } ${styles.input} `}
                    />
                </div>
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-1 block ">
                        {errors.email}
                    </span>
                )}

                <div className="w-full mt-4 relative mb-1">
                    <MdLockOutline
                        className="absolute bottom-4 left-3 z-1 cursor-pointer text-gray-500"
                        size={20}
                    />
                    <input
                        type={!show ? 'password' : 'text'}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="Password"
                        className={`${
                            errors.password &&
                            touched.password &&
                            'border-red-500'
                        } ${styles.input}`}
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-4 right-2 z-1 cursor-pointer text-black"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-4 right-2 z-1 cursor-pointer text-black"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                </div>
                {errors.password && touched.password && (
                    <span className="text-red-500 pt-1 block">
                        {errors.password}
                    </span>
                )}

                <div className="w-full mt-10">
                    <input
                        type="submit"
                        value="Login"
                        className={`${styles.button}`}
                    />
                </div>
                <br />

                <div className="text-center font-Poppins text-[15px] text-black">
                    {"Don't have an account? "}
                    <span
                        className="text-[#4745e4] pl-1 cursor-pointer text-[16px] font-semibold "
                        onClick={() => setRoute('Sign-Up')}
                    >
                        Sign up
                    </span>
                </div>

                <br />

                <h5 className="flex before:flex-1 before:border-b before:mr-2 before:my-auto before:border-gray-500 after:flex-1 after:border-b after:ml-2 after:my-auto after:border-gray-500 text-center font-Poppins text-[15px] text-black mt-2">
                    Or connect with
                </h5>

                <div className="flex items-center justify-center my-2">
                    <FcGoogle
                        size={40}
                        className="cursor-pointer mx-2"
                        onClick={() => signIn('google')}
                    />
                    <AiFillGithub
                        size={40}
                        className="cursor-pointer mx-2 text-gray-800"
                        onClick={() => signIn('github')}
                    />
                    <FaFacebook
                        size={37}
                        className="cursor-pointer mx-2 text-[#1075db]"
                    />
                </div>
            </form>
            <br />
        </div>
    );
};

export default Login;
