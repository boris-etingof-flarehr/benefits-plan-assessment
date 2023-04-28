import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import desktopImg from '../../assets/desktop/all-set.jpg';
import mobileImg from '../../assets/mobile/all-set-mobile.jpg';
import { BackendApi } from '../../services/backend-api';
import { BenefitsOnboardingCustomElementName } from '../../index';
import SimpleTemplate from './templates/simple-template';

interface Props {
  step: { current: number; total: number };
}

const AllSet: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ eventType: 'SummaryViewed', summaryVariant: 'generic' });
    })();
  }, []);

  return (
    <SimpleTemplate
      stepNumber={props.step}
      step={{
        content: {
          imageUrl: desktopImg,
          mobileImageUrl: mobileImg,
          title: "You're all set!",
          description:
            'Simply continue and review the details you have provided to complete your onboarding.'
        }
      }}
      primaryButton={{
        text: 'Continue',
        class: 'mt-6 md:mt-6',
        onClick: async (): Promise<void> => {
          await BackendApi.command({ eventType: 'Completed' });
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
