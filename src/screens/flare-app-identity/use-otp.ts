import { useMemo, useState } from 'preact/hooks';

export const OTP_LENGTH = 6;

const useOtp = (): {
  otp: {
    valid: boolean;
    code: string;
  };
  // eslint-disable-next-line no-unused-vars
  setOtp: (otp: string) => void;
} => {
  const [otp, setOtp] = useState('');

  const valid = useMemo(() => otp.length === OTP_LENGTH, [otp.length]);

  return { otp: { valid, code: otp }, setOtp };
};

export default useOtp;
