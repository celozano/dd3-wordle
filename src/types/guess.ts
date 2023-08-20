export type Status = "" | "correct" | "incorrect" | "misplaced";

export interface Guess {
  id: number;
  word: string;
  matches: Array<{
    letter: string;
    status: Status;
  }>;
}
