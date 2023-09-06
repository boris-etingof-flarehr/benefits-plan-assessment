import { Transition } from '@headlessui/react';
import { ComponentProps, FunctionalComponent } from 'preact';
import React from 'preact/compat';

type Props = ComponentProps<'div'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const TopBottomLayout = ({ children }: Props) => {
  const childrenComponents = React.Children.toArray(children);
  const top = childrenComponents.find((o) => o.type === Top);
  const bottom = childrenComponents.find((o) => o.type === Bottom);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition duration-700 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      class="opacity-0"
    >
      <div class="mt-20 md:mt-0 flex flex-col text-center items-center max-w-[40rem] mx-auto">
        <Transition
          appear={true}
          show={true}
          enter="transition duration-700 ease-out md:transition-none"
          enterFrom="-translate-y-6"
          enterTo="translate-y-0"
          class="-translate-y-6"
        >
          {top && <div class="flex items-center h-full">{top}</div>}
        </Transition>
        <Transition
          appear={true}
          show={true}
          enter="transition delay-300 duration-[600ms] ease-out"
          enterFrom="opacity-0 -translate-y-6"
          enterTo="opacity-100 translate-y-0"
          class="opacity-0 -translate-y-6"
        >
          {bottom && <div class="flex items-center h-full">{bottom}</div>}
        </Transition>
      </div>
    </Transition>
  );
};

const Top: FunctionalComponent<ComponentProps<'div'>> = ({ children }) => <>{children}</>;
const Bottom: FunctionalComponent<ComponentProps<'div'>> = ({ children }) => <>{children}</>;

TopBottomLayout.Top = Top;
TopBottomLayout.Bottom = Bottom;

export default TopBottomLayout;
