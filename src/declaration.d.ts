declare module '*.css';
declare module '*.jpg';
declare module '*.png';

declare module '*.svg' {
    import { FC , SVGProps} from "preact/compat"

    const content: FC<SVGProps<SVGElement>>
    export default content
  }