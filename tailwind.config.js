module.exports = {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: {
          base: 'var(--fl-color-primary)',
          light: 'var(--fl-color-primary-light)',
          dark: 'var(--fl-color-primary-dark)',
          disabled: 'var(--fl-color-primary-disabled)',
          hover: 'var(--fl-color-primary-hover)',
          focus: 'var(--fl-color-primary-focus)',
          text: 'var(--fl-color-primary-text)'
        },
        secondary: {
          base: 'var(--fl-color-secondary)',
          light: 'var(--fl-color-secondary-light)',
          dark: 'var(--fl-color-secondary-dark)',
          disabled: 'var(--fl-color-secondary-disabled)',
          hover: 'var(--fl-color-secondary-hover)',
          focus: 'var(--fl-color-secondary-focus)',
          text: 'var(--fl-color-secondary-text)'
        }
      }
    }
  }
};
