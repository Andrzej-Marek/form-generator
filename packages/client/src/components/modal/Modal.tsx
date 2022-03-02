import Icon from "@components/icons/Icon";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useRef } from "react";
import { ModalContent } from ".";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const cancelButtonRef = useRef(null);

  const t = (name: string) => name;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
      >
        <div className="min-h-full md:p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-full h-full" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block min-w-content max-w-full text-start align-middle transition-all relative">
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="inline-block outline-none focus:outline-none absolute right-4 end-4 top-4 z-[60]"
              >
                <span className="sr-only">{t("text-close")}</span>
                <Icon icon="cross" className="w-3 h-3" />
              </button>
              <ModalContent>{children}</ModalContent>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
