// icons
import {
  MoonIcon,
  QuestionMarkCircleIcon as QuestionIcon,
  ChartBarSquareIcon as StatsIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

// hooks
import { useDarkMode } from "../hooks/darkMode";

interface Props {
  setIsHowToPlayModalOpen: (isOpen: boolean) => void;
  setIsStatsModalOpen: (isOpen: boolean) => void;
}

export const Header = ({
  setIsHowToPlayModalOpen,
  setIsStatsModalOpen,
}: Props) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="dark:bg-dark-200 flex h-[84px] items-center justify-evenly bg-[#F3F3F3]">
      <button onClick={() => setIsHowToPlayModalOpen(true)}>
        <QuestionIcon className="h-6 w-6 text-gray-500 dark:text-white" />
      </button>
      <h1 className="text-[40px] font-semibold text-[#202537] dark:text-white">
        WORDLE
      </h1>
      <div className="flex gap-3">
        <button onClick={() => setIsStatsModalOpen(true)}>
          <StatsIcon className="h-6 w-6 text-gray-500 dark:text-white" />
        </button>
        <button onClick={() => toggleDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-gray-500 dark:text-white" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-500 dark:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};
