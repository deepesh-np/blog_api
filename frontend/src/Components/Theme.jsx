/** @format */

import { useTheme } from '../themes/useTheme.js';

const Button = () => {
  const { themeName, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('[Theme Button] Clicked. Current theme:', themeName);
    console.log(
      '[Theme Button] toggleTheme is:',
      typeof toggleTheme,
      toggleTheme
    );
    toggleTheme();
    console.log('[Theme Button] After toggle call');
  };

  return (
    <button
      className='bg-primary text-white px-3 py-1 rounded'
      onClick={handleClick}
      title={`Switch to ${themeName === 'light' ? 'dark' : 'light'} mode`}>
      {themeName === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default Button;
