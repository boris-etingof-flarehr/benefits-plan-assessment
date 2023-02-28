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
      title="Get discounted private health cover through Flare"
      info="Get up to $800 cashback when you open a new health insurance policy with AIA."
      learnMoreText={[
        'Great value protection',
        'Cover for emergencies',
        'Waiting periods recognised',
        'Unlock extra benefits with AIA Vitality'
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
    />
  );
};

export default HealthInsurance;
