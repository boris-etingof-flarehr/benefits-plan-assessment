import { FunctionalComponent } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import Button from '../../../components/button';
import CheckBox from '../../../components/check-box';
import TextField from '../../../components/text-field';
import Heading from '../../../components/typography/heading';
import Title from '../../../components/typography/title';
import useTrace from '../../../hooks/use-trace';
import TopBottomLayout from '../../../layouts/top-bottom-layout';
import usePhoneNumber from '../use-phone-number';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (phoneNumber: { formatted: string; masked: string }) => Promise<void>;
  onDecline: () => void;
};

const PhoneNumber: FunctionalComponent<Props> = ({ onSubmit, onDecline }) => {
  const { trace } = useTrace();
  const [membership, setMembership] = useState(false);
  const [error, setError] = useState('');
  const { setPhoneNumber, phoneNumber } = usePhoneNumber();

  useEffect(() => {
    trace('sign-up-viewed');
  }, []);

  const handleSubmit = useCallback(() => {
    setError('');

    return onSubmit(phoneNumber)
      .then(() => trace('sign-up-completed'))
      .catch(() => {
        setError('Creating account failed.');
      });
  }, [phoneNumber, onSubmit, trace]);

  return (
    <TopBottomLayout>
      <TopBottomLayout.Top>
        <div className="flex flex-col gap-5">
          <Heading>Create your Flare Benefits account</Heading>
          <Title>Confirm your mobile number below to create your Flare Benefits account</Title>
        </div>
      </TopBottomLayout.Top>
      <TopBottomLayout.Bottom>
        <div className="mt-5 md:w-[300px] text-left">
          <TextField
            allowedKeyPattern={/[+0-9]/}
            inputMode="numeric"
            className="mt-1 mb-1 w-full"
            label="Australian Mobile Number"
            value={phoneNumber.masked}
            onChange={setPhoneNumber}
          />
          {error && <span className="text-xs text-rose-500">{error}</span>}

          <CheckBox className="mt-5" value={membership} onChange={setMembership}>
            <CheckBox.Label>
              <span>
                I have read and agree to Flare Benefits
                <a href="https://www.flarehr.com/privacy-policy/" target="_blank" rel="noreferrer">
                  {' Terms of Use '}
                </a>
                and
                <a href="https://www.flarehr.com/privacy-policy/" target="_blank" rel="noreferrer">
                  {' Privacy Policy'}
                </a>
                .
              </span>
            </CheckBox.Label>
          </CheckBox>

          <Button
            class="mt-5 md:w-full"
            disabled={!phoneNumber.valid || !membership}
            onClickPromise={handleSubmit}
          >
            Create account
          </Button>

          <Button
            class="mt-5 md:w-full bg-white hover:bg-gray-100 focus:ring-gray-200 border-0 shadow-none text-gray-700 border-gray-300"
            onClickPromise={async (): Promise<void> => {
              onDecline();
            }}
          >
            No thanks
          </Button>
        </div>
      </TopBottomLayout.Bottom>
    </TopBottomLayout>
  );
};

export default PhoneNumber;
