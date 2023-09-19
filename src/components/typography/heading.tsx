import { ComponentProps, FunctionalComponent } from 'preact';

type Props = ComponentProps<'h1'>;

const Heading: FunctionalComponent<Props> = ({ className, children }) => (
  <h1 className={`text-2xl md:text-3xl font-bold ${className ?? ''}`}>{children}</h1>
);

export default Heading;
