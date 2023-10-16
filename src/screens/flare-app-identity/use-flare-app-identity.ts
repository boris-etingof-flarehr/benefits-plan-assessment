import { BackendApi } from '../../services/backend-api';

const useFlareAppIdentity = (): {
  // eslint-disable-next-line no-unused-vars
  signUp: (phoneNumber: string) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  verifyOtp: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
} => {
  const signUp = async (phoneNumber: string): Promise<void> => {
    await BackendApi.GetClient().post('auth/signUp', { phoneNumber });
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    await BackendApi.GetClient().post('auth/verify', { otp });
  };

  const resendOtp = async (): Promise<void> => {
    await BackendApi.GetClient().post('auth/resend');
  };

  return {
    signUp,
    verifyOtp,
    resendOtp
  };
};

export default useFlareAppIdentity;
