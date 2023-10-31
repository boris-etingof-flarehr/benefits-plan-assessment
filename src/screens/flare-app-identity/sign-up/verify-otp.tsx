import { FunctionalComponent } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import LeftArrow from '../../../assets/icons/left-arrow.svg';
import Button from '../../../components/button';
import TextButton from '../../../components/text-button';
import TextField from '../../../components/text-field';
import Heading from '../../../components/typography/heading';
import Title from '../../../components/typography/title';
import useCountdown from '../../../hooks/use-countdown';
import TopBottomLayout from '../../../layouts/top-bottom-layout';
import useOtp, { OTP_LENGTH } from '../use-otp';
import SigningUpDialog from './signing-up-dialog';

type Props = {
  phoneNumber: string;
  // eslint-disable-next-line no-unused-vars
  onVerify: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onGoBack: () => void;
};

const VerifyOtp: FunctionalComponent<Props> = ({
  phoneNumber,
  onVerify,
  onResendOtp,
  onGoBack
}) => {
  const { otp, setOtp } = useOtp();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const { countdown, restart: restartCountdown } = useCountdown(60);

  useEffect(restartCountdown, [restartCountdown]);

  const handleOnVerify = useCallback(() => {
    setVerifying(true);
    setError('');

    return onVerify(otp.code)
      .catch(setError)
      .finally(() => {
        setVerifying(false);
      });
  }, [onVerify, otp.code]);

  const handleOnResendOtp = useCallback(() => {
    setError('');

    return onResendOtp().then(restartCountdown).catch(setError);
  }, [onResendOtp, restartCountdown]);

  return (
    <>
      <SigningUpDialog open={verifying} />
      <TopBottomLayout>
        <TopBottomLayout.Top>
          <div className="flex flex-col gap-5">
            <Heading>Verify your mobile number</Heading>
            <Title>An SMS verification code has been sent to the number {phoneNumber}.</Title>
          </div>
        </TopBottomLayout.Top>
        <TopBottomLayout.Bottom>
          <div className="mt-5 md:w-[300px] text-left">
            <TextField
              allowedKeyPattern={/[0-9]/}
              inputMode="numeric"
              minLength={OTP_LENGTH}
              maxLength={OTP_LENGTH}
              className="mt-1 mb-1 w-full"
              label="Enter your verification code"
              onChange={setOtp}
            />
            {error && <span className="text-xs text-rose-500">{error}</span>}

            <p class="mt-2 text-center text-xs text-gray-600 disabled:opacity-75 ">
              Didn't get the code?
              <TextButton
                disabled={countdown !== 0}
                className="underline mx-2 disabled:text-gray-600 disabled:hover:bg-transparent disabled:cursor-text disabled:px-0"
                onClick={handleOnResendOtp}
              >
                Resend SMS
              </TextButton>
              {countdown !== 0 && <>in {countdown} secs</>}
            </p>

            <Button class="mt-5 md:w-full" disabled={!otp.valid} onClickPromise={handleOnVerify}>
              Continue
            </Button>
            <Button
              class="mt-5 md:w-full bg-white hover:bg-gray-100 focus:ring-gray-200 border-0 shadow-none text-gray-700 border-gray-300"
              onClickPromise={async (): Promise<void> => {
                onGoBack();
              }}
            >
              <span className="flex gap-3">
                <LeftArrow />
                Back
              </span>
            </Button>
          </div>
        </TopBottomLayout.Bottom>
      </TopBottomLayout>
    </>
  );
};

export default VerifyOtp;