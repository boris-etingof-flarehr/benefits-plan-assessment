import { FunctionalComponent } from 'preact';
import { BackendApi } from '../../services/backend-api';
import desktopImg from '../../assets/desktop/boosts.jpg';
import mobileImg from '../../assets/mobile/boosts-mobile.jpg';
import StepTemplate from './step-template';

interface Props {
  step: { current: number; total: number };
  onStepComplete: () => void;
}

const Boosts: FunctionalComponent<Props> = (props) => {
  return (
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
      button={{
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressBoosts' });
          props.onStepComplete();
        }
      }}
    />
  );
};

export default Boosts;
