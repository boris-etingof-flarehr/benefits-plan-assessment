import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { AppContext } from '../../context/app-context';
import SignIn from './sign-in';
import useFlareAppIdentity from './use-flare-app-identity';

type Props = {
  onComplete: () => void;
};
const Index: FunctionalComponent<Props> = ({ onComplete }) => {
  const { flareAppIdentity } = useContext(AppContext);
  const { verifyOtp, resendOtp } = useFlareAppIdentity();

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
    </>
  );
};

export default Index;
