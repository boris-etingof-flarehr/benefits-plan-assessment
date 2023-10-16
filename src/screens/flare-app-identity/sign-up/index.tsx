import { FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import useStep from '../use-step';
import PhoneNumber from './phone-number';
import Success from './success';
import VerifyOtp from './verify-otp';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSignUp: (phoneNumber: string) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onVerify: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onSuccess: () => void;
  onDecline: () => void;
};

const Index: FunctionalComponent<Props> = ({
  onSignUp,
  onVerify,
  onResendOtp,
  onSuccess,
  onDecline
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { step, goBack, goNext } = useStep(3);

  const handleSubmitPhoneNumber = useCallback(
    (phoneNumber: { formatted: string; masked: string }) =>
      onSignUp(phoneNumber.formatted).then(() => {
        setPhoneNumber(phoneNumber.masked);
        goNext();
      }),
    [goNext, onSignUp]
  );

  const handleVerifyOtp = useCallback(
    (otp: string) =>
      onVerify(otp).then(() => {
        goNext();
      }),
    [goNext, onVerify]
  );

  return (
    <>
      {step === 1 && <PhoneNumber onSubmit={handleSubmitPhoneNumber} onDecline={onDecline} />}
      {step === 2 && (
        <VerifyOtp
          phoneNumber={phoneNumber}
          onVerify={handleVerifyOtp}
          onResendOtp={onResendOtp}
          onGoBack={goBack}
        />
      )}
      {step === 3 && <Success onContinue={onSuccess} />}
    </>
  );
};

export default Index;
