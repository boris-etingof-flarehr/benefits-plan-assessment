import { benefitsOnboardingApi } from '@app/services';
import { AxiosError } from 'axios';

const source = 'Onboarding';
const channel = 'onboarding';

const useFlareAppIdentity = (): {
  signUp: (mobileNumber: string) => Promise<{ isVerificationRequired: boolean }>;
  verifyOtp: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
} => {
  const signUp = async (mobileNumber: string): Promise<{ isVerificationRequired: boolean }> => {
    return benefitsOnboardingApi.backend
      .getClient()
      .post<{ isVerificationRequired: boolean | undefined }>('v2.0/auth/signUp', {
        mobileNumber,
        source,
        channel
      })
      .then((response) => ({
        isVerificationRequired: response.data.isVerificationRequired ?? true
      }));
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    await benefitsOnboardingApi.backend
      .getClient()
      .post('auth/verify', { otp, source, channel })
      .catch(handleError);
  };

  const resendOtp = async (): Promise<void> => {
    await benefitsOnboardingApi.backend.getClient().post('auth/resend').catch(handleError);
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

const handleError = (ex: unknown): Promise<void> => {
  const response = (ex as AxiosError)?.response?.data as {
    code: keyof typeof FlareAppIdentityErrorCode;
  };

  const errorStr = FlareAppIdentityErrorCode[response?.code];
  throw errorStr ?? 'Sorry, we are currently experiencing some issues. Please try again later.';
};

export default useFlareAppIdentity;
