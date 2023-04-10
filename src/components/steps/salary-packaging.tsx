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
      title="Buying a car soon? Save on average $6000 a year!"
      info="Did you know you could use your pre-tax salary with a Flare Cars novated lease to purchase your car and save on running costs... Learn more about how novated leasing can help you save."
      learnMoreText={[
        'No upfront deposit required',
        'Customer saves an average of $6,000 per year on purchase price and running costs of a new or used car.',
        'Stress & hassle free - Flare will take care of all the paperwork with your employer.',
        'Tax & GST savings',
        'You could save over $10,000 per year when you purchase an electric vehicle'
      ]}
      primaryButton={{
        text: 'I want to learn more',
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
