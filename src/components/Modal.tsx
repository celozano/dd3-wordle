import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isStatic?: boolean;
  handleClose: () => void;
};

export const Modal = ({
  title,
  children,
  isOpen,
  isStatic = false,
  handleClose,
}: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        static={isStatic}
        onClose={handleClose}
      >
        <div className="flex min-h-full items-center justify-center px-4 py-10 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="dark:bg-dark-400 fixed inset-0 min-h-screen bg-gray-100 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="dark:bg-dark-300 inline-block transform overflow-hidden rounded-lg border border-black bg-gray-100 px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:border-gray-600 sm:my-8 sm:p-6 sm:align-middle">
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-4xl font-extrabold text-gray-900 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
