"use client"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from './config'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null); //to track otp is sent or not 
    const [otpSent, setOtpSent] = useState(false);
    //creating the firebase instance 
    const auth = getAuth(app);
    const router = useRouter();
    
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            'size' : 'normal',
            'callback' : (response) => {

            },
            'expired-callback' : () => {

            }
        })
    }, [auth]);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }

    const handleSendOtp = async () => {
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            setPhoneNumber('');
            alert('Otp has been sent'); 
        } catch (error) {
            console.log(error);
        }
    }

    const handleOtpSubmit = async () => {
        try {
            await confirmationResult.confirm(otp);
            setOtp('');
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        {!otpSent ? (
            <div id="recaptcha-container"></div>
        ) : null}
        <input
         type='tel'
         value={phoneNumber}
         onChange={handlePhoneNumberChange}
         placeholder='Enter phone number with country code'
         className='border border-gray-500 p-2 rounded-md' 
        />
        <input
         type='text'
         value={otp}
         onChange={handleOtpChange}
         placeholder='Enter OTP'
         className='border border-gray-500 p-2 rounded-md' 
        />

        <button
          onClick={otpSent ? handleOtpSubmit : handleSendOtp}
          className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md m-2`}
          style={{ backgroundColor: otpSent ? 'green' : 'blue'}}
        >
            {otpSent ? 'Submit OTP' : 'Send OTP'}
        </button>
    </div>
  )
}

export default login