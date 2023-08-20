// types
import { Statistics } from "../types/statistics";

const STATS_KEY = "statistics";
const WORDS_KEY = "words";

export const useStatistics = () => {
  const saveStatistics = (statistics: Statistics) => {
    localStorage.setItem(STATS_KEY, JSON.stringify(statistics));
  };

  const getStats = (): Statistics | null => {
    const statistics = localStorage.getItem(STATS_KEY);

    return statistics ? (JSON.parse(statistics) as Statistics) : null;
  };

  return {
    saveStatistics,
    statistics: getStats(),
  };
};

export const useWordsPlayed = () => {
  const saveWordsPlayed = (words: Array<string>) => {
    localStorage.setItem(WORDS_KEY, JSON.stringify(words));
  };

  const getWordsPlayed = () => {
    const words = localStorage.getItem(WORDS_KEY);

    return words ? (JSON.parse(words) as Array<string>) : [];
  };

  return {
    saveWordsPlayed,
    wordsPlayed: getWordsPlayed(),
  };
};
