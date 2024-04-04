import { FunctionalComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import useStep, { StepName } from '../use-step';
import PhoneNumber from './phone-number';
import Success from './success';
import VerifyOtp from './verify-otp';

type Props = {
  phoneNumber?: string;
  onSignUp: (_phoneNumber: string) => Promise<{ isVerificationRequired: boolean }>;
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
  const { step, goBack, goToStep } = useStep();

  const handleSubmitPhoneNumber = useCallback(
    (phoneNumber: { formatted: string; masked: string }) =>
      onSignUp(phoneNumber.formatted).then((res) => {
        setPhoneNumber(phoneNumber.masked);
        goToStep(res.isVerificationRequired ? StepName.OTP : StepName.SUCCESS);
      }),
    [goToStep, onSignUp]
  );

  const handleVerifyOtp = useCallback(
    (otp: string) =>
      onVerify(otp).then(() => {
        goToStep(StepName.SUCCESS);
      }),
    [goToStep, onVerify]
  );

  return (
    <>
      {step === StepName.PHONE_NUMBER && (
        <PhoneNumber
          phoneNumber={phoneNumber}
          onSubmit={handleSubmitPhoneNumber}
          onDecline={onDecline}
        />
      )}
      {step === StepName.OTP && (
        <VerifyOtp
          phoneNumber={phoneNumber}
          onVerify={handleVerifyOtp}
          onResendOtp={onResendOtp}
          onGoBack={goBack}
        />
      )}
      {step === StepName.SUCCESS && <Success onContinue={onSuccess} />}
    </>
  );
};

export default Index;
