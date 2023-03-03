import { FunctionalComponent } from 'preact';
import desktopImg from '../../assets/desktop/perks.jpg';
import mobileImg from '../../assets/mobile/perks-mobile.jpg';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';
import { useEffect } from 'preact/hooks';

interface Props {
  step: { current: number; total: number };
  employerName: string;
  onStepComplete: () => void;
}

const Perks: FunctionalComponent<Props> = (props) => {
  useEffect(() => {
    (async (): Promise<void> => {
      await BackendApi.command({ name: 'StartPerks' });
    })();
  }, []);

  return (
    <StepTemplate
      header={{ title: 'WORKPLACE PERKS', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="Discounts & Perks"
      info="Get easy access to your workplace benefits, plus exclusive perks, company events and wellbeing resources."
      learnMoreText={[
        `Save on everyday items, including groceries and fuel, with discounts from hundreds of well-known brands`,
        'Local discounts at over 9,000 locations nationwide',
        'Premium perks, from discounted healthcare to phone, internet, and beyond'
      ]}
      primaryButton={{
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressPerks' });
          props.onStepComplete();
        }
      }}
    />
  );
};

export default Perks;
