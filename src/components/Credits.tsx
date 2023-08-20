// components
import { Modal } from "./Modal";

interface Props {
  isCreditsModalOpen: boolean;
}

export const Credits = ({ isCreditsModalOpen }: Props) => {
  return (
    <Modal
      title="¡Felicidades!"
      isOpen={isCreditsModalOpen}
      handleClose={() => null}
    >
      <div className="flex min-w-[546px] flex-col gap-10 text-gray-900 dark:text-white">
        <p className="text-lg">
          ¡Has terminado el juego, no hay mas palabras por adivinar!
        </p>
      </div>
    </Modal>
  );
};
