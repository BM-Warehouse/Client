// Utills
import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from '@/context/ThemeContext';

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div className=" h-8 w-8 items-center justify-center hidden md:flex ">
        <button className="text-xl" onClick={toggleTheme}>
          {theme === 'light' ? (
            <FaMoon className="text-tertiary" />
          ) : (
            <FaSun className="text-tertiary" />
          )}
        </button>
      </div>
      <div className="fixed bottom-24 left-6 z-40 rounded-lg bg-secondary md:bottom-10 md:hidden ">
        <div className="flex h-8 w-8 items-center justify-center ">
          <button className="text-xl" onClick={toggleTheme}>
            {theme === 'light' ? (
              <FaMoon className="text-black" />
            ) : (
              <FaSun className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleTheme;
