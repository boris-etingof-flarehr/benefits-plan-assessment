/* eslint-disable no-unused-vars */
import { AxiosError } from 'axios';

import { BackendApi } from '../../services/backend-api';

const useFlareAppIdentity = (): {
  signUp: (mobileNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
} => {
  const signUp = async (mobileNumber: string): Promise<void> => {
    await BackendApi.GetClient().post('auth/signUp', { mobileNumber }).catch(handleError);
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    await BackendApi.GetClient().post('auth/verify', { otp }).catch(handleError);
  };

  const resendOtp = async (): Promise<void> => {
    await BackendApi.GetClient().post('auth/resend').catch(handleError);
  };

  return {
    signUp,
    verifyOtp,
    resendOtp
  };
};

enum FlareAppIdentityErrorCode {
  Auth_AccountDisabled = 'Mobile number associated account has been disabled.',
  Auth_AccountLocked = 'Too many attempts, please try later.',
  Auth_Registered = 'An error occurred when registering your mobile number. Please refresh the screen and try again.',
  Auth_Unregistered = 'No record found that matches your mobile number.',
  Auth_InvalidVerificationCode = 'Invalid verification code.',
  Validation_InvalidPhoneNumber = "Invalid mobile number. Please ensure it's an Australian mobile number starting with \"04\"."
}

const handleError = (ex: any): Promise<void> => {
  const response = (ex as AxiosError)?.response?.data as {
    error: keyof typeof FlareAppIdentityErrorCode;
  };

  const errorStr = FlareAppIdentityErrorCode[response?.error];

  throw errorStr ?? 'Unexpected error occurred.';
};

export default useFlareAppIdentity;
