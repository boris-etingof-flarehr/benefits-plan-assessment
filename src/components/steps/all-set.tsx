import { FunctionalComponent } from 'preact';
import desktopImg from '../../assets/desktop/all-set.jpg';
import mobileImg from '../../assets/mobile/all-set-mobile.jpg';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';
import { BenefitsOnboardingCustomElementName } from '../../index';

interface Props {
  step: { current: number; total: number };
}

const AllSet: FunctionalComponent<Props> = (props) => {
  return (
    <StepTemplate
      header={{ title: 'ALL SET', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="You're all set!"
      info="Simply continue and review the details you have provided to complete your onboarding."
      primaryButton={{
        text: 'Continue',
        class: 'mt-6 md:mt-6',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'Complete' });
          const root = document.querySelector(BenefitsOnboardingCustomElementName);
          const event = new CustomEvent('step-completion', { bubbles: true });
          root?.dispatchEvent(event);
          await new Promise((_) => setTimeout(_, 10000));
        }
      }}
     />
  );
};

export default AllSet;
