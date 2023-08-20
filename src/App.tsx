import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

// components
import { Credits } from "./components/Credits";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { HowToPlay } from "./components/HowToPlay";
import { Statistics } from "./components/Statistics";

// constants
import { NEW_WORD_INTERVAL } from "./constants/settings";
import { WORDS } from "./constants/words";

// hooks
import { useStatistics, useWordsPlayed } from "./hooks/localStorage";

// utils
import { getRandomWord } from "./utils/game";

export const App = () => {
  const [answer, setAnswer] = useState(getRandomWord(WORDS));
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);
  const [nextGameTime, setNextGameTime] = useState(
    Date.now() + NEW_WORD_INTERVAL,
  );

  const { statistics, saveStatistics } = useStatistics();
  const { wordsPlayed, saveWordsPlayed } = useWordsPlayed();

  const restartGame = () => {
    setNextGameTime(Date.now() + NEW_WORD_INTERVAL);
    setIsStatsModalOpen(false);
    setAnswer(getRandomWord(WORDS));
  };

  useEffect(() => {
    if (answer) {
      saveWordsPlayed([...wordsPlayed, answer]);
    }
  }, [answer]);

  useEffect(() => {
    if (!statistics) {
      saveStatistics({ gamesPlayed: 0, gamesWon: 0 });
      setIsHowToPlayModalOpen(true);
    }
  }, [statistics]);

  useEffect(() => {
    const interval = setInterval(() => {
      restartGame();
    }, NEW_WORD_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dark:bg-dark-300 flex min-h-screen flex-col bg-white">
      <div className="mx-auto my-0 flex min-w-[640px] flex-1 flex-col gap-1 p-8">
        <Header
          setIsHowToPlayModalOpen={setIsHowToPlayModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
        />
        <Game
          key={answer}
          answer={answer}
          setIsStatsModalOpen={setIsStatsModalOpen}
        />
      </div>
      <Statistics
        isStatsModalOpen={isStatsModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
      >
        <Countdown
          date={nextGameTime}
          renderer={({ minutes, seconds }) => (
            <div>
              {zeroPad(minutes)}:{zeroPad(seconds)}
            </div>
          )}
        />
      </Statistics>
      <HowToPlay
        isHowToPlayModalOpen={isHowToPlayModalOpen}
        setIsHowToPlayModalOpen={setIsHowToPlayModalOpen}
      />
      <Credits isCreditsModalOpen={answer === ""} />
    </div>
  );
};
