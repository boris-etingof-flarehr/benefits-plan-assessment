import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import desktopImg from '../../assets/desktop/health-insurance.jpg';
import mobileImg from '../../assets/mobile/health-insurance-mobile.jpg';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';

interface Props {
  step: { current: number; total: number };
  onStepComplete: () => void;
}

const HealthInsurance: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ name: 'StartHealthInsurance' });
    })();
  }, []);

  return (
    <StepTemplate
      header={{ title: 'PRIVATE HEALTH INSURANCE', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="Want better value Health Insurance?"
      info="Let us compare and help save on your health cover with a quick chat. Get an obligation free quote now!"
      learnMoreText={[
        'Compare products from trusted health insurers and switch for free, with all paperwork handled for you',
        "Australians have saved an average of $300 when they've compared and switched health cover*",
        'Receive one months premium free if you find an identical policy for cheaper elsewhere**'
      ]}
      primaryButton={{
        text: "Yes, I'm interested",
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressHealthInsurance', accepted: true });
          props.onStepComplete();
        }
      }}
      secondaryButton={{
        text: 'No, thanks',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressHealthInsurance', accepted: false });
          props.onStepComplete();
        }
      }}
      termsAndConditions={
        <>
          <span>
            By expressing your interest, you consent to Flare contacting you with more information
            and agree to the Compare Club{' '}
            <a
              class="text-primary-base"
              target="_blank"
              rel="noreferrer"
              href="https://compareclub.com.au/terms-of-use/"
            >
              Terms Of Use
            </a>{' '}
            and{' '}
            <a
              class="text-primary-base"
              target="_blank"
              rel="noreferrer"
              href="https://compareclub.com.au/privacy-policy/"
            >
              Privacy Policy
            </a>
          </span>
          <span>
            * Savings estimate is provided by CompareClub where on average, customers saved $300.43
            based on 136,746 customers between 1 Jan 2018 - 23 December 2022
          </span>
          <span>
            ** Lowest price guarantee provided by CompareClub.{' '}
            <a
              class="text-primary-base"
              target="_blank"
              rel="noreferrer"
              href="https://compareclub.com.au/health-insurance/lowest-price-guarantee/"
            >
              Terms and conditions
            </a>{' '}
            apply.
          </span>
        </>
      }
    />
  );
};

export default HealthInsurance;
