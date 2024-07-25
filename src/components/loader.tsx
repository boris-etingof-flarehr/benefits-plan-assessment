import { FunctionalComponent } from 'preact';

interface Props {
  size?: 'sm' | 'lg';
  theme?: 'primary' | 'light';
}

const Loader: FunctionalComponent<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={props.size === 'lg' ? 'h-10 w-10' : 'h-5 w-5'}
    >
      <path
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.99743 8C1.99743 11.3151 4.68487 14.0026 8 14.0026C11.3151 14.0026 14.0026 11.3151 14.0026 8C14.0026 4.68487 11.3151 1.99743 8 1.99743C4.68487 1.99743 1.99743 4.68487 1.99743 8Z"
        class={props.theme === 'light' ? 'fill-white' : 'fill-gray-200'}
        fill-opacity={props.theme === 'light' ? '0.3' : '1'}
      />
      <path
        d="M8 1C8 0.447715 8.44943 -0.00643769 8.99741 0.0624193C9.70527 0.151368 10.3996 0.334798 11.0615 0.608964C12.0321 1.011 12.914 1.60028 13.6569 2.34315C14.3997 3.08602 14.989 3.96793 15.391 4.93853C15.6652 5.60043 15.8486 6.29473 15.9376 7.0026C16.0064 7.55057 15.5523 8 15 8C14.4477 8 14.0085 7.54925 13.9169 7.00462C13.842 6.55939 13.7169 6.12298 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.87702 2.28313 9.44061 2.15804 8.99538 2.08314C8.45075 1.99152 8 1.55228 8 1Z"
        class={props.theme === 'light' ? 'fill-white' : 'fill-primary-base'}
      />
    </svg>
  );
};

export default Loader;
