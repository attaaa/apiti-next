import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CustomModal({
  isOpen,
  onOverlayClick,
  children,
}: {
  isOpen: boolean;
  onOverlayClick: Function;
  children: React.ReactNode;
}) {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <div>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-80"
            onClick={() => onOverlayClick()}
          ></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-y-75"
          enterTo="opacity-100 scale-y-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-y-100"
          leaveTo="opacity-0 scale-y-75"
        >
          <div className="absolute bottom-4 left-4 z-20 w-[calc(100%-2rem)] origin-bottom rounded-2xl bg-white p-4">
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
