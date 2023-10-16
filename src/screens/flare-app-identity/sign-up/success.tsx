import { FunctionalComponent } from 'preact';

import Check from '../../../assets/icons/check.svg';
import Button from '../../../components/button';
import Heading from '../../../components/typography/heading';
import Title from '../../../components/typography/title';
import TopBottomLayout from '../../../layouts/top-bottom-layout';

type Props = {
  onContinue: () => void;
};

const Success: FunctionalComponent<Props> = ({ onContinue }) => {
  return (
    <TopBottomLayout>
      <TopBottomLayout.Top>
        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-50 text-primary-base">
          <Check className= "h-7 w-7"/>
        </div>
      </TopBottomLayout.Top>
      <TopBottomLayout.Bottom>
        <div className="mt-5 flex flex-col items-center gap-5 text-center">
          <Heading>You now have access to Flare Benefits</Heading>
          <Title>
            We’ve sent an email with further instructions including how to download the Flare
            Benefits app to your phone.
          </Title>
          <Button
            class="mt-5 w-full md:w-[240px]"
            onClickPromise={async (): Promise<void> => {
              onContinue();
            }}
          >
            Continue to Benefits
          </Button>
        </div>
      </TopBottomLayout.Bottom>
    </TopBottomLayout>
  );
};

export default Success;
