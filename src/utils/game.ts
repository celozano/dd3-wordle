// types
import { Status } from "../types/guess";

export const getRandomWord = (arr: Array<string>) => {
  let word = "";
  let tries = 0;

  const storage = localStorage.getItem("words");
  const wordsPlayed = storage ? JSON.parse(storage) : [];

  while (word === "" && tries <= arr.length - 1) {
    word = arr[Math.floor(Math.random() * arr.length)];
    if (wordsPlayed.includes(word)) {
      word = "";
      tries += 1;
    }
  }

  if (tries === arr.length) {
    return "";
  }

  return word.toUpperCase();
};

export const checkGuess = (guess: string, answer: string) => {
  const guessChars = guess.toUpperCase().split("");
  const answerChars = answer.split("");

  return guessChars.map((guessChar, index) => {
    const answerChar = answerChars[index];

    let status;
    if (guessChar === answerChar) {
      status = "correct";
    } else if (answerChars.includes(guessChar)) {
      status = "misplaced";
    } else {
      status = "incorrect";
    }

    return {
      letter: guessChar,
      status,
    };
  }) as Array<{ letter: string; status: Status }>;
};

export const getStatusColor = (status: Status, isKey = false) => {
  if (status === "correct") {
    return "bg-[#66A060]";
  } else if (status === "incorrect") {
    return "bg-[#939B9F]";
  } else if (status === "misplaced") {
    return "bg-[#CEB02C]";
  } else {
    return `bg-[#DADDDE] ${isKey ? "dark:bg-dark-100" : "dark:bg-dark-200"}`;
  }
};
