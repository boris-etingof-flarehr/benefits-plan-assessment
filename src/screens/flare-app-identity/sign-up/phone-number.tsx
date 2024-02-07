import { FunctionalComponent } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import Heading from '../../../components/typography/heading';
import Title from '../../../components/typography/title';
import useTrace from '../../../hooks/use-trace';
import TopBottomLayout from '../../../layouts/top-bottom-layout';
import usePhoneNumber from '../use-phone-number';

type Props = {
  phoneNumber?: string;
  onSubmit: (_phoneNumber: { formatted: string; masked: string }) => Promise<void>;
  onDecline: () => void;
};

const PhoneNumber: FunctionalComponent<Props> = ({ phoneNumber: prefilledPhoneNumber, onSubmit, onDecline }) => {
  const { trace } = useTrace();
  const [error, setError] = useState('');
  const { setPhoneNumber, phoneNumber } = usePhoneNumber(prefilledPhoneNumber);

  useEffect(() => {
    trace('sign-up-viewed');
  }, []);

  const handleFocusIn = useCallback(() => {
    setError('');
  }, []);

  const handleFocusOut = useCallback(() => {
    const errorString = phoneNumber.valid
      ? ''
      : 'Please enter a valid Australian mobile number beginning with 04.';
    setError(errorString);
  }, [phoneNumber.valid]);

  const handleSubmit = useCallback(async () => {
    if (!phoneNumber.valid) {
      return;
    }

    await onSubmit(phoneNumber)
      .then(() => trace('sign-up-completed'))
      .catch(setError);
  }, [phoneNumber, onSubmit, trace]);

  const handleDecline = useCallback(() => {
    return trace('sign-up-declined').then(onDecline);
  }, [onDecline, trace]);

  return (
    <TopBottomLayout>
      <TopBottomLayout.Top>
        <div className="flex flex-col gap-5">
          <Heading>Join your workplace benefits program</Heading>
          <Title>
            Enter your <b>personal</b> mobile number to finish setting up your Flare Benefits account linked to your workplace
          </Title>
        </div>
      </TopBottomLayout.Top>
      <TopBottomLayout.Bottom>
        <div className="mt-5 md:w-[300px] text-left">
          <TextField
            allowedKeyPattern={/[+0-9]/}
            inputMode="numeric"
            className="mt-1 mb-1 w-full"
            label="Australian Mobile Number"
            onChange={setPhoneNumber}
            onfocusin={handleFocusIn}
            onfocusout={handleFocusOut}
          />
          <div className="h-8 leading-none">
            <span className="text-xs text-rose-500">{error}</span>
          </div>
          <div>
            <span className="font-medium text-sm text-gray-900 text-center">
              By creating your account you confirm you have read and agree to Flare Benefits{' '}
              <a href="https://www.flarehr.com/flare-app-terms-and-conditions/" target="_blank" rel="noreferrer">
                {' Terms of Use '}
              </a>
              and
              <a href="https://www.flarehr.com/privacy-policy/" target="_blank" rel="noreferrer">
                {' Privacy Policy'}
              </a>
              .{' '}
            </span>
          </div>
          <Button class="mt-5 md:w-full" onClickPromise={handleSubmit}>
            Join your workplace
          </Button>

          <Button
            class="mt-5 md:w-full bg-white hover:bg-gray-100 focus:ring-gray-200 border-0 shadow-none text-gray-700 border-gray-300"
            onClickPromise={handleDecline}
          >
            Not now
          </Button>
        </div>
      </TopBottomLayout.Bottom>
    </TopBottomLayout>
  );
};

export default PhoneNumber;
