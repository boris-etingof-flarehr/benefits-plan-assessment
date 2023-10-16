import { FunctionalComponent } from 'preact';

import FullScreenDialog from '../../../components/dialog/full-screen-dialog';
import Loader from '../../../components/loader';
import Heading from '../../../components/typography/heading';
import Title from '../../../components/typography/title';

const SigningUpDialog: FunctionalComponent<{ open: boolean }> = ({ open }) => (
  <FullScreenDialog open={open}>
    <div className="flex flex-col gap-5 items-center justify-center text-center mt-20">
      <span class="animate-spin">
        <Loader size="lg" />
      </span>
      <Heading>Creating your account</Heading>
      <div>
        <Title>This can take up to 30 seconds.</Title>
        <Title>Please don't navigate away or refresh your browser.</Title>
      </div>
    </div>
  </FullScreenDialog>
);

export default SigningUpDialog;
