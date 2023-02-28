import { Fragment, FunctionalComponent } from 'preact';
import { BackendApi } from '../../services/backend-api';
import desktopImg from '../../assets/desktop/boosts.jpg';
import mobileImg from '../../assets/mobile/boosts-mobile.jpg';
import StepTemplate from './step-template';
import { useEffect } from 'preact/hooks';

interface Props {
  step: { current: number; total: number };
  onStepComplete: () => void;
}

const Boosts: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ name: 'StartBoosts' });
    })();
  }, []);

  return (
    <Fragment>
      <StepTemplate
        header={{ title: 'FINANCIAL BENEFITS', step: props.step }}
        image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
        title="Give your pay a boost"
        info="Make your pay work even harder for you, save on major life expenses and get rewarded whenever you spend with your Flare Card."
        learnMoreText={[
          'Flare Rewards spending cashbacks',
          'Your own contactless Mastercard',
          'Post-tax health insurance and income protection',
          'Pre-tax deductions including child-care and super'
        ]}
        primaryButton={{
          onClick: async (): Promise<void> => {
            await BackendApi.command({ name: 'ProgressBoosts' });
            props.onStepComplete();
          }
        }}
      />
      <div class="mt-6 md:mt-16 max-w-[59.5rem] mx-auto text-xs leading-4 text-gray-500">
        This material is general information only and does not consider your objectives, financial
        situation or needs. You should consider the Product Disclosure Statement (PDS) and the
        Target Market Determination relating to this product before making any decision. The Flare
        Mastercard is a prepaid, reloadable Mastercard issued by EML Payment Solutions Limited ABN
        30 131 436 532 AFSL 404131 (EML). Flare Financial Services Pty Ltd ABN 16 612 284 081 is
        involved in the promotion and distribution of the Card and is a Corporate Authorised
        Representative of EML. Mastercard and the circles design are registered trademarks of
        Mastercard International Incorporated.
      </div>
    </Fragment>
  );
};

export default Boosts;
