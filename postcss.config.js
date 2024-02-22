import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import tailwindcss from 'tailwindcss'

const plugins = [
  tailwindcss,
  autoprefixer
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(cssnano);
}

export default {
  plugins
};
