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
      title="Save on your Health Insurance!"
      info="Think you're paying too much? Get a quote from AIA."
      learnMoreText={[
        'Up to 70% back on extras and up to 80% back on dental extras',
        'Waiting periods recognised when transferring your existing policy',
        'Plus, AIA Health comes with AIA Vitality Rewards - earn up to $760 in gift cards every year'
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
            By expressing your interest, you consent to Flare contacting you with more information.
          </span>
        </>
      }
    />
  );
};

export default HealthInsurance;
