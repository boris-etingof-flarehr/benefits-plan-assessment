import { FunctionalComponent } from 'preact';
import desktopImg from '../../assets/desktop/perks.jpg';
import mobileImg from '../../assets/mobile/perks-mobile.jpg';
import StepTemplate from './step-template';
import { BackendApi } from '../../services/backend-api';

interface Props {
  step: { current: number; total: number };
  employerName: string;
  onStepComplete: () => void;
}

const Perks: FunctionalComponent<Props> = (props) => {
  return (
    <StepTemplate
      header={{ title: 'WORKPLACE PERKS', step: props.step }}
      image={{ mobileSrc: mobileImg, desktopSrc: desktopImg }}
      title="Get perks in your pocket"
      info="Get easy access to your workplace benefits, plus exclusive perks, company events and wellbeing resources."
      learnMoreText={[
        `All your ${props.employerName} benefits`,
        'Offers and discounts from leading retailers',
        'Access to wellbeing content and resources',
        'Curated wellness events'
      ]}
      button={{
        onClick: async (): Promise<void> => {
          await BackendApi.command({ name: 'ProgressPerks' });
          props.onStepComplete();
        }
      }}
    />
  );
};

export default Perks;
