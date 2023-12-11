import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { AppContext } from '../../context/app-context';
import SignInOrSignUp from './sign-up';
import useFlareAppIdentity from './use-flare-app-identity';

type Props = {
  onSuccess: () => void;
  onDecline: () => void;
};
const Index: FunctionalComponent<Props> = ({ onSuccess, onDecline }) => {
  const {
    identity: { phoneNumber }
  } = useContext(AppContext);
  const { signUp, verifyOtp, resendOtp } = useFlareAppIdentity();

  return (
    <>
      <SignInOrSignUp
        phoneNumber={phoneNumber}
        onSignUp={signUp}
        onVerify={verifyOtp}
        onResendOtp={resendOtp}
        onSuccess={onSuccess}
        onDecline={onDecline}
      />
    </>
  );
};

export default Index;
