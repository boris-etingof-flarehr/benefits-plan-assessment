import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { AppContext } from '../../context/app-context';
import SignIn from './sign-in';
import SignUp from './sign-up';
import useFlareAppIdentity from './use-flare-app-identity';

type Props = {
  onComplete: () => void;
  onAbandon: () => void;
};
const Index: FunctionalComponent<Props> = ({ onComplete, onAbandon }) => {
  const { flareAppIdentity } = useContext(AppContext);
  const { signUp, verifyOtp, resendOtp } = useFlareAppIdentity();

  return (
    <>
      {flareAppIdentity?.status === 'RegisteredButNotWorkplaceLinked' && (
        <SignIn
          phoneNumber={flareAppIdentity.maskedPhoneNumber}
          onVerify={verifyOtp}
          onResendOtp={resendOtp}
          onSuccess={onComplete}
        />
      )}
      {flareAppIdentity?.status === 'Unregistered' && (
        <SignUp
          onSignUp={signUp}
          onVerify={verifyOtp}
          onResendOtp={resendOtp}
          onSuccess={onComplete}
          onDecline={onAbandon}
        />
      )}
    </>
  );
};

export default Index;
