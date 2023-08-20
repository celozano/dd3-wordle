// components
import { Modal } from "./Modal";

// types
import { Status } from "../types/guess";

// utils
import { getStatusColor } from "../utils/game";

interface Props {
  isHowToPlayModalOpen: boolean;
  setIsHowToPlayModalOpen: (isOpen: boolean) => void;
}

const EXAMPLES = [
  {
    word: "GATOS",
    description: "La letra G está en la palabra y en la posición correcta.",
    matches: [
      { letter: "G", status: "correct" },
      { letter: "A", status: "" },
      { letter: "T", status: "" },
      { letter: "O", status: "" },
      { letter: "S", status: "" },
    ],
  },
  {
    word: "VOCAL",
    description:
      "La letra C está en la palabra pero en la posición incorrecta.",
    matches: [
      { letter: "V", status: "" },
      { letter: "O", status: "" },
      { letter: "C", status: "misplaced" },
      { letter: "A", status: "" },
      { letter: "L", status: "" },
    ],
  },
  {
    word: "CANTO",
    description: "La letra O no está en la palabra.",
    matches: [
      { letter: "C", status: "" },
      { letter: "A", status: "" },
      { letter: "N", status: "" },
      { letter: "T", status: "" },
      { letter: "O", status: "incorrect" },
    ],
  },
] as Array<{
  word: string;
  description: string;
  matches: Array<{
    letter: string;
    status: Status;
  }>;
}>;

const WordExample = ({
  description,
  matches,
  word,
}: {
  description: string;
  matches: Array<{ letter: string; status: Status }>;
  word: string;
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="mb-1 flex gap-1">
          {word.split("").map((char, index) => {
            const bgColor = getStatusColor(matches[index].status);

            return (
              <span
                key={index}
                className={`${bgColor} relative grid aspect-square w-[76px] place-content-center rounded-md border border-black text-2xl font-bold`}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>
      <p>{description}</p>
    </>
  );
};

export const HowToPlay = ({
  isHowToPlayModalOpen,
  setIsHowToPlayModalOpen,
}: Props) => {
  return (
    <Modal
      title="Cómo jugar"
      isOpen={isHowToPlayModalOpen}
      handleClose={() => setIsHowToPlayModalOpen(false)}
    >
      <div className="flex max-w-[546px] flex-col gap-8 text-lg text-gray-900 dark:text-white">
        <div className="space-y-2 text-left">
          <p>Adivina la palabra oculta en cinco intentos.</p>
          <p>Cada intento debe ser una palabra válida de 5 letras.</p>
          <p>
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </p>
        </div>
        <div className="text-left">
          <h3 className="font-bold">Ejemplos</h3>
          {EXAMPLES.map(({ description, matches, word }) => (
            <WordExample
              key={word}
              description={description}
              matches={matches}
              word={word}
            />
          ))}
        </div>
        <div className="text-left">
          <p>
            Puede haber letras repetidas. Las pistas son independientes para
            cada letra.
          </p>
        </div>
        <div className="text-center">
          <p>¡Una palabra nueva cada 5 minutos!</p>
        </div>
        <div>
          <button
            className="rounded-md bg-[#66A060] px-14 py-2 text-xl font-semibold text-white"
            onClick={() => setIsHowToPlayModalOpen(false)}
          >
            ¡JUGAR!
          </button>
        </div>
      </div>
    </Modal>
  );
};
