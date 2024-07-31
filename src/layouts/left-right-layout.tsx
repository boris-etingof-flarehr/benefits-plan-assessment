import { Transition } from '@headlessui/react';
import { ComponentProps, FunctionalComponent } from 'preact';
import React from 'preact/compat';

type Props = ComponentProps<'div'> & {verticalAlignment?: string};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const LeftRightLayout = ({ children, verticalAlignment = 'items-center' }: Props) => {
  const childrenComponents = React.Children.toArray(children);
  const left = childrenComponents.find((o) => o.type === Left);
  const right = childrenComponents.find((o) => o.type === Right);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition duration-700 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div class="md:grid md:grid-cols-2 max-w-[59.5rem] mx-auto">
        <Transition
          appear={true}
          show={true}
          enter="transition duration-700 ease-out md:transition-none"
          enterFrom="-translate-y-6"
          enterTo="translate-y-0"
        >
          {left && <div class={`flex h-full ${verticalAlignment}`}>{left}</div>}
        </Transition>
        <Transition
          appear={true}
          show={true}
          enter="transition delay-300 duration-[600ms] ease-out"
          enterFrom="opacity-0 -translate-y-6"
          enterTo="opacity-100 translate-y-0"
        >
          {right && <div class={`flex h-full ${verticalAlignment}`}>{right}</div>}
        </Transition>
      </div>
    </Transition>
  );
};

const Left: FunctionalComponent<ComponentProps<'div'>> = ({ children }) => <>{children}</>;
const Right: FunctionalComponent<ComponentProps<'div'>> = ({ children }) => <>{children}</>;

LeftRightLayout.Left = Left;
LeftRightLayout.Right = Right;

export default LeftRightLayout;
