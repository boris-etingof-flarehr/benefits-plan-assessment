import { FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import useStep from '../use-step';
import PhoneNumber from './phone-number';
import Success from './success';
import VerifyOtp from './verify-otp';

type Props = {
  phoneNumber?: string;
  onSignUp: (_phoneNumber: string) => Promise<void>;
  onVerify: (_otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onSuccess: () => void;
  onDecline: () => void;
};

const Index: FunctionalComponent<Props> = ({
  phoneNumber: prefilledPhoneNumber,
  onSignUp,
  onVerify,
  onResendOtp,
  onSuccess,
  onDecline
}) => {
  const [phoneNumber, setPhoneNumber] = useState(prefilledPhoneNumber ?? '');
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
      {step === 1 && <PhoneNumber phoneNumber={phoneNumber} onSubmit={handleSubmitPhoneNumber} onDecline={onDecline} />}
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
