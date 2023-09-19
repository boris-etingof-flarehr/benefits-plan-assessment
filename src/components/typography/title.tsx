import { ComponentProps, FunctionalComponent } from 'preact';

type Props = ComponentProps<'h3'>;

const Title: FunctionalComponent<Props> = ({ className, children }) => (
  <h3 class={`text-base md:text-lg text-gray-600 ${className ?? ''}`}>{children}</h3>
);

export default Title;
