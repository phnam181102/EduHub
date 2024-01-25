import { styles } from '@/app/styles/styles';
import React, { FC, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

type Props = {
    setRoute: (route: string) => void;
};

type VerifyNumber = {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
};

const Verification: FC<Props> = ({ setRoute }) => {
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: '',
        1: '',
        2: '',
        3: '',
    });

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verificationHandler = async () => {
        setInvalidError(true);
    };

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === '' && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <div>
            <h1 className={`${styles.title} pb-1`}>OTP Verification</h1>
            <p className="text-black text-center text-[18px]">
                Your code was sent to you via email
            </p>

            <br />

            <div className="w-full flex items-center justify-center mt-2">
                <div className="w-[80px] h-[80px] rounded-full bg-[#4745e4] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>

            <br />
            <br />

            <div className="w-[95%] m-auto flex items-center justify-around ">
                {Object.keys(verifyNumber).map((key, index) => (
                    <input
                        type="number"
                        key={key}
                        ref={inputRefs[index]}
                        className={`w-[62px] h-[70px] border-[3px] rounded-[10px] flex items-center justify-center text-[28px] text-gray-800 font-semibold font-Poppins outline-none text-center ${
                            invalidError
                                ? 'shake border-red-500 bg-[#aa32460e]'
                                : 'border-[#0000004a] bg-[#3270aa1e]'
                        }`}
                        placeholder=""
                        maxLength={1}
                        value={verifyNumber[key as keyof VerifyNumber]}
                        onChange={(e) =>
                            handleInputChange(index, e.target.value)
                        }
                    />
                ))}
            </div>

            <div className="w-full flex justify-center mt-12 mb-6">
                <button
                    className={`${styles.button} w-[50%]`}
                    onClick={verificationHandler}
                >
                    Verify
                </button>
            </div>

            <div className="text-center font-Poppins text-[15px] text-black mb-6">
                Or go back to sign in?
                <span
                    className="text-[#4745e4] pl-1 cursor-pointer text-[16px] font-semibold "
                    onClick={() => setRoute('Login')}
                >
                    Sign in
                </span>
            </div>
        </div>
    );
};

export default Verification;
