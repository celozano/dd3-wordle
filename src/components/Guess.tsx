// types
import { Guess as GuessType } from "../types/guess";

// utils
import { getStatusColor } from "../utils/game";

interface Props {
  currentGuess: string;
  guesses: Array<GuessType>;
}

export const Guess = ({ guesses }: Props) => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      {guesses.map((guess) => {
        return (
          // @ts-ignore
          <p key={guess.id} className="mb-1 flex gap-1">
            {guess.word.split("").map((char, index) => {
              const status = guess.matches[index]?.status;
              const bgColor = getStatusColor(status);

              return (
                <span
                  key={index}
                  className={`${bgColor} relative grid aspect-square w-[20%] place-content-center rounded-md text-4xl font-extrabold text-white`}
                >
                  {char}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
