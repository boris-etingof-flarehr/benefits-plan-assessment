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
      title="Private Health Insurance"
      info="Get up to 8 weeks free when you open a new health insurance policy with AIA, one of Australia's leading private health insurers."
      learnMoreText={[
        'Great value protection including cover for emergencies',
        'Waiting periods recognised when transferring your existing policy',
        'Unlock exclusive offers with AIA Vitality Rewards'
      ]}
      primaryButton={{
        text: "Yes, I'm interested",
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressHealthInsurance', accepted: true });
          props.onStepComplete();
        }
      }}
      secondaryButton={{
        text: 'Not right now',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressHealthInsurance', accepted: false });
          props.onStepComplete();
        }
      }}
      termsAndConditions={["By expressing your interest, you consent to Flare contacting you with more information."]}
    />
  );
};

export default HealthInsurance;
