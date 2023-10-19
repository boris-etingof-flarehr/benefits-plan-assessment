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
  Auth_AccountDisabled = 'Sorry, your account has been deactivated. Please contact Flare if there are any issues.',
  Auth_AccountLocked = 'Sorry, your account is currently locked due to too many attempts. Please try again later.',
  Auth_Unregistered = 'Sorry, we are currently experiencing some issues. Please try again later.',
  Auth_InvalidVerificationCode = "Your one time passcode doesn't look right. Please try again with a new one time passcode.",
  Auth_SessionExpired = 'Sorry, looks like your session has expired. Please try again.',
  Validation_InvalidPhoneNumber = 'Please enter a valid Australian mobile number beginning with 04.'
}

const handleError = (ex: any): Promise<void> => {
  const response = (ex as AxiosError)?.response?.data as {
    error: keyof typeof FlareAppIdentityErrorCode;
  };

  const errorStr = FlareAppIdentityErrorCode[response?.error];

  throw (
    errorStr ??
    'Sorry, your account is currently locked due to too many attempts. Please try again later.'
  );
};

export default useFlareAppIdentity;
