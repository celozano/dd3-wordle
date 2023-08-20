// components
import { Modal } from "./Modal";

// hooks
import { useStatistics } from "../hooks/localStorage";

interface Props {
  children: React.ReactNode;
  isStatsModalOpen: boolean;
  setIsStatsModalOpen: (isOpen: boolean) => void;
}

export const Statistics = ({
  children,
  isStatsModalOpen,
  setIsStatsModalOpen,
}: Props) => {
  const { statistics } = useStatistics();

  return (
    <Modal
      title="Estadísticas"
      isOpen={isStatsModalOpen}
      handleClose={() => setIsStatsModalOpen(false)}
    >
      <div className="flex min-w-[546px] flex-col gap-8 text-gray-900 dark:text-white">
        <div className="mx-16 flex justify-between">
          <div className="inline-block">
            <h1 className="text-4xl font-extrabold">
              {statistics?.gamesPlayed}
            </h1>
            <span className="text-xl">Jugadas</span>
          </div>
          <div className="block">
            <h1 className="text-4xl font-extrabold">{statistics?.gamesWon}</h1>
            <span className="text-xl">Victorias</span>
          </div>
        </div>
        <div className="sapce-y-2 block">
          <div className="text-lg">SIGUIENTE PALABRA</div>
          <span className="text-xl font-semibold">{children}</span>
        </div>
        <div>
          <button
            className="rounded-md bg-[#66A060] px-14 py-2 text-xl font-semibold text-white"
            onClick={() => setIsStatsModalOpen(false)}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};
