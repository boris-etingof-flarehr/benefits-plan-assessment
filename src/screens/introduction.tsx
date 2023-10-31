import { FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import introDesktopImg from '../assets/desktop/intro.png';
import Button from '../components/button';
import { AppContext } from '../context/app-context';
import TopBottomLayout from '../layouts/top-bottom-layout';
import { BackendApi } from '../services/backend-api';

interface Props {
  employerName: string;
  onStepComplete: () => void;
}

const Introduction: FunctionalComponent<Props> = (props) => {
  const { featureFlags } = useContext(AppContext);
  const [membership, setMembership] = useState(true);

  useEffect(() => {
    if (!featureFlags.flareAppIdentity) {
      (async (): Promise<void> => {
        await BackendApi.command({
          eventType: 'OfferViewed',
          offerName: 'Membership',
          data: {
            featureName: '',
            treatmentName: ''
          }
        });
      })();
    }
  }, []);

  return (
    <TopBottomLayout>
      <TopBottomLayout.Top>
        <img class="max-w-[30rem] w-full" src={introDesktopImg} />
      </TopBottomLayout.Top>
      <TopBottomLayout.Bottom>
        <div>
          <h3 class="mt-8 text-2xl md:text-3xl leading-8 md:leading-9 font-bold">
            Finish setting up your workplace benefits
          </h3>
          <p class="mt-3 text-lg leading-7 text-gray-600">
            Because your workplace uses Flare you have access to a range of exclusive benefits that
            can save you thousands of dollars every year on your car, private health insurance,
            weekly grocery shop and more.
          </p>

          {!featureFlags.flareAppIdentity && (
            <div class="flex items-center text-left mt-6">
              <input
                class="accent-primary-base h-4 w-4"
                type="checkbox"
                name="membership"
                checked={membership}
                onChange={(e): void => setMembership((e.target as any)?.checked)}
              />
              <label class="font-medium text-sm text-gray-900 ml-3" for="membership">
                <span>
                  I would like to be contacted about the latest benefits from Flare and agree to the{' '}
                  <a
                    href="https://www.flarehr.com/privacy-policy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    privacy policy
                  </a>
                  .
                </span>
              </label>
            </div>
          )}

          <Button
            class="mt-8"
            onClickPromise={async (): Promise<void> => {
              await BackendApi.command({ eventType: 'Started' });
              if (!featureFlags.flareAppIdentity) {
                await BackendApi.command({
                  eventType: 'OfferProgressed',
                  offerName: 'Membership',
                  data: {
                    accepted: membership,
                    featureName: '',
                    treatmentName: '',
                    template: 'Eoi'
                  }
                });
              }

              props.onStepComplete();
            }}
          >
            Continue
          </Button>
        </div>
      </TopBottomLayout.Bottom>
    </TopBottomLayout>
  );
};

export default Introduction;
