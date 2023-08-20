import { useEffect, useState } from "react";

// constants
import { NUMBER_OF_GUESSES_ALLOWED } from "../constants/settings";

// components
import { Guess } from "./Guess";
import { Keyboard } from "./Keyboard";

// hooks
import { useStatistics } from "../hooks/localStorage";

// types
import { Guess as GuessType } from "../types/guess";

// utils
import { checkGuess } from "../utils/game";

interface Props {
  answer: string;
  setIsStatsModalOpen: (isOpen: boolean) => void;
}

export const Game = ({ answer, setIsStatsModalOpen }: Props) => {
  const [guesses, setGuesses] = useState<Array<GuessType>>(() => {
    return [...Array(NUMBER_OF_GUESSES_ALLOWED).keys()].map((_, index) => {
      return {
        id: index,
        word: " ".repeat(5),
        matches: [],
      };
    });
  });
  const [attempts, setAttempts] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isWinner, setIsWinner] = useState(false);

  const isGameOver = isWinner || attempts === NUMBER_OF_GUESSES_ALLOWED;
  const currentGuessPointer = attempts;

  const { statistics, saveStatistics } = useStatistics();

  const onChar = (key: string) => {
    if (isWinner || isGameOver) {
      return;
    }

    const word = currentGuess.trimEnd();

    if (word.length < 5) {
      const value = `${word}${key}`;

      // find and replace word
      const currentGuesses = guesses.map((guess) => {
        if (guess.id === currentGuessPointer) {
          return { ...guess, word: value.padEnd(5, " "), matches: [] };
        } else {
          return guess;
        }
      });

      setCurrentGuess(value);
      setGuesses(currentGuesses);
    }
  };

  const onEnter = () => {
    if (isWinner || isGameOver || !currentGuess) {
      return;
    }

    const matches = checkGuess(currentGuess, answer);

    // find and replace word
    const currentGuesses = guesses.map((guess) => {
      if (guess.id === currentGuessPointer) {
        return { ...guess, word: currentGuess, matches };
      } else {
        return guess;
      }
    });

    setCurrentGuess("");
    setGuesses(currentGuesses);
    setAttempts((prev) => prev + 1);

    if (currentGuesses.some((guess) => guess.word === answer)) {
      setIsWinner(true);
    }
  };

  const onDelete = () => {
    if (isWinner || isGameOver) {
      return;
    }

    const word = currentGuess.trimEnd().slice(0, -1);

    // find and replace word
    const currentGuesses = guesses.map((guess) => {
      if (guess.id === currentGuessPointer) {
        return { ...guess, word: word.padEnd(5, " "), matches: [] };
      } else {
        return guess;
      }
    });

    setCurrentGuess(word);
    setGuesses(currentGuesses);
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const keyCode = e.code;

      if (keyCode === "Enter") {
        onEnter();
      } else if (keyCode === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();

        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };

    window.addEventListener("keyup", listener);

    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onChar, onEnter, onDelete]);

  useEffect(() => {
    if (isWinner) {
      saveStatistics({
        gamesPlayed: Number(statistics!.gamesPlayed) + 1,
        gamesWon: Number(statistics!.gamesWon) + 1,
      });
      setIsStatsModalOpen(true);
    }

    if (isGameOver && !isWinner) {
      saveStatistics({
        ...statistics!,
        gamesPlayed: statistics!.gamesPlayed + 1,
      });
      setIsStatsModalOpen(true);
    }
  }, [isGameOver, isWinner]);

  return (
    <div>
      <div key={answer} className="mx-auto flex flex-1 flex-col gap-1 p-8">
        <Guess currentGuess={currentGuess} guesses={guesses} />
      </div>
      <Keyboard
        onChar={onChar}
        onEnter={onEnter}
        onDelete={onDelete}
        guesses={guesses}
      />
    </div>
  );
};
