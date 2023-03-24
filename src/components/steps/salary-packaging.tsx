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
      title="Save tax with Salary Packaging"
      info="Save thousands of dollars a year on a car by using your pre-tax salary with a Flare Cars novated lease. Learn more to discover how novated leasing can help you save."
      learnMoreText={[
        'Tax & GST savings',
        'All-in-one budgeting through set deductions from your pay',
        'No upfront deposit required',
        'Plus, New Electric Vehicle legislation can increase your savings by up to $5,000'
      ]}
      primaryButton={{
        text: "I'd like to learn more",
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressSalaryPackaging', accepted: true });
          props.onStepComplete();
        }
      }}
      secondaryButton={{
        text: 'No, thanks',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressSalaryPackaging', accepted: false });
          props.onStepComplete();
        }
      }}
      termsAndConditions={
        <>
          <span>
            By expressing your interest, you consent to Flare contacting you with more information.
          </span>
          <span>
            * Total tax savings and cost per week per vehicle is indicative only. For more details
            please see our{' '}
            <a
              class="text-primary-base"
              target="_blank"
              rel="noreferrer"
              href="https://www.flarehr.com/cars/latest-deals"
            >
              latest offers
            </a>
            .
          </span>
        </>
      }
    />
  );
};

export default SalaryPackaging;
