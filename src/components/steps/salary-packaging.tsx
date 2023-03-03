import { FunctionalComponent } from 'preact';
import desktopImg from '../../assets/desktop/salary-packaging.jpg';
import mobileImg from '../../assets/mobile/salary-packaging-mobile.jpg';
import { useEffect } from 'preact/hooks';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';

interface Props {
  step: { current: number; total: number };
  onStepComplete: () => void;
}

const SalaryPackaging: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ name: 'StartSalaryPackaging' });
    })();
  }, []);

  return (
    <StepTemplate
      header={{ title: 'NOVATED CAR LEASING', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="Private Vehicle"
      info="Buying a car in the next 12 months? Discover a smarter way to pay for your car and running costs that can save you up to $10,000 every year."
      learnMoreText={['Tax and GST savings', 'All-in-one budgeting through set deductions from your pay', 'New Electric Vehicle legislation can increase your savings by up to $5,000', 'No upfront deposit required']}
      primaryButton={{
        text: "Yes, I'm interested",
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressSalaryPackaging', accepted: true });
          props.onStepComplete();
        }
      }}
      secondaryButton={{
        text: 'Not right now',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressSalaryPackaging', accepted: false });
          props.onStepComplete();
        }
      }}
      termsAndConditions={["By expressing your interest, you consent to Flare contacting you with more information.","* Total tax savings and cost per week per vehicle is indicative only."]}
    />
  );
};

export default SalaryPackaging;
