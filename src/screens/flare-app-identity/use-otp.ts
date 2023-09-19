import { useMemo, useState } from 'preact/hooks';

const OTP_LENGTH = 6;

const useOtp = (): {
  OTP_LENGTH: number;
  isValid: boolean;
  otp: string;
  // eslint-disable-next-line no-unused-vars
  setOtp: (otp: string) => void;
} => {
  const [otp, setOtp] = useState('');

  const isValid = useMemo(() => otp.length === OTP_LENGTH, [otp.length]);

  return { OTP_LENGTH, isValid, otp, setOtp };
};

export default useOtp;
