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
      title="Save on tax with salary packaging"
      info="Save thousands of dollars a year with a Flare novated lease, one of the most effective ways to maximise your take home pay."
      learnMoreText={['Tax Savings using pretax income', 'GST Savings', 'Set and forget budgeting']}
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
    />
  );
};

export default SalaryPackaging;
