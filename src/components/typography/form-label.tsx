import { ComponentProps, FunctionalComponent } from 'preact';

type Props = ComponentProps<'label'>;

const FormLabel: FunctionalComponent<Props> = ({ className, children, ...props }) => (
  <label class={`text-base text-gray-600 ${className ?? ''}`} {...props}>
    {children}
  </label>
);
export default FormLabel;
