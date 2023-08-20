// types
import { Guess as GuessType, Status } from "../types/guess";

// utils
import { getStatusColor } from "../utils/game";

const keyboardKeys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

interface Props {
  guesses: Array<GuessType>;
  onChar: (value: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

const Key = ({
  value,
  status = "",
  onClick,
}: {
  value: string;
  status?: Status;
  onClick: (value: string) => void;
}) => {
  const isKey = true;
  const bgColor = getStatusColor(status, isKey);

  return (
    <button
      onClick={() => onClick(value)}
      className={`${bgColor} grid h-8 w-8 place-content-center rounded-md text-black dark:text-white ${
        (value === "ENTER" || value === "DELETE") && "px-9"
      }`}
    >
      {value}
    </button>
  );
};

export const Keyboard = ({ guesses, onEnter, onDelete, onChar }: Props) => {
  const keyStatus = guesses
    .map((guess) => guess.matches)
    .flat()
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.letter]: curr.status,
      }),
      {},
    ) as { [key: string]: Status };

  const onClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  return (
    <div className="dark:bg-dark-200 flex flex-col items-center gap-1 rounded-t-md bg-gray-300/30 py-8 text-sm">
      {keyboardKeys.map((row, index) => {
        return (
          <div className="flex gap-1" key={row}>
            {index === 2 && <Key value="ENTER" onClick={onClick} />}
            {row.split("").map((key) => {
              return (
                <Key
                  key={key}
                  value={key}
                  status={keyStatus[key]}
                  onClick={onClick}
                />
              );
            })}
            {index === 2 && <Key value="DELETE" onClick={onClick} />}
          </div>
        );
      })}
    </div>
  );
};
