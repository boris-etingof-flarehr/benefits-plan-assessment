import { Fragment, FunctionalComponent } from 'preact';

import css from '../index.css';
import Intro from './steps/intro';
import Perks from './steps/perks';
import SalaryPackaging from './steps/salary-packaging';
import HealthInsurance from './steps/health-insurance';
import Boosts from './steps/boosts';
import GetApp from './steps/get-app';
import { useEffect, useState } from 'preact/hooks';
import { BackendApi, InitResponse } from '../services/backend-api';
import Loader from './loader';
import { useSteps } from '../hooks/useSteps';
import AllSet from './steps/all-set';

interface Props {
  ['backend-url']: string;
  ['access-token']: string;
  ['workflows-instance-id']: string;
}

interface AppConfig {
  backendUrl: string;
  accessToken: string;
  workflowsInstanceId: string;
}

const App: FunctionalComponent<Props> = (props) => {
  const config: AppConfig = {
    backendUrl: props['backend-url'],
    accessToken: props['access-token'],
    workflowsInstanceId: props['workflows-instance-id']
  };

  const [data, setInitData] = useState<InitResponse>({
    configuredSteps: [],
    employerName: '',
    email: '',
    isComplete: false
  });

  const [currentStep, setNextStep, stepNumber] = useSteps();

  useEffect(() => {
    (async (): Promise<void> => {
      BackendApi.initClient(config.backendUrl, config.accessToken, config.workflowsInstanceId);
      const response = await BackendApi.init();
      setInitData(response);
      if (currentStep === 'Loading') {
        setNextStep({ ...response });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Step: FunctionalComponent = () => {
    switch (currentStep) {
      case 'Intro':
        return <Intro employerName={data.employerName} onStepComplete={setNextStep} />;
      case 'Perks':
        return (
          <Perks step={stepNumber} employerName={data.employerName} onStepComplete={setNextStep} />
        );
      case 'Boosts':
        return <Boosts step={stepNumber} onStepComplete={setNextStep} />;
      case 'SalaryPackaging':
        return <SalaryPackaging step={stepNumber} onStepComplete={setNextStep} />;
      case 'HealthInsurance':
        return <HealthInsurance step={stepNumber} onStepComplete={setNextStep} />;
      case 'GetApp':
        return <GetApp step={stepNumber} email={data.email} />;
      case 'AllSet':
        return <AllSet step={stepNumber} />;
      case 'Loading':
      default:
        return (
          <div class="flex justify-center">
            <span class="animate-spin">
              <Loader size="lg" />
            </span>
          </div>
        );
    }
  };

  return (
    <Fragment>
      <style>{css.toString()}</style>
      <div class="font-inter pt-6 pb-8 md:py-24 px-px">
        <Step />
      </div>
    </Fragment>
  );
};

export default App;
