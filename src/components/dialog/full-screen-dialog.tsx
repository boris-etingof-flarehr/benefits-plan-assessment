import { ComponentProps, FunctionalComponent } from 'preact';

type Props = Omit<ComponentProps<'dialog'>, 'className'>;

const FullScreenDialog: FunctionalComponent<Props> = ({ children, ...props }) => (
  <dialog className="z-50 w-full h-full absolute top-0 left-0 bottom-0 right-0" {...props}>
    {children}
  </dialog>
);

export default FullScreenDialog;
