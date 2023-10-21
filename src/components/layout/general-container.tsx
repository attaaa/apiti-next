import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Navbar from "./navbar";
import CustomModal from "../modal/custom-modal";

export default function GeneralContainer({
  title,
  actionName,
  contentSlot,
  modalContentSlot,
}: {
  title: string;
  actionName: string;
  contentSlot: React.ReactNode;
  modalContentSlot: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currScrollPos, setCurrScrollPos] = useState(0);
  const containerScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerScrollElm = containerScrollRef.current;
    if (!containerScrollElm) return;

    const handleScroll = () => {
      setIsVisible(containerScrollElm.scrollTop < currScrollPos);
      setCurrScrollPos(containerScrollElm.scrollTop);
    };
    containerScrollElm.addEventListener("scroll", handleScroll);

    return () => {
      containerScrollElm.removeEventListener("scroll", handleScroll);
    };
  }, [currScrollPos]);

  return (
    <Transition
      as={Fragment}
      appear
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      show={true}
    >
      <div className="h-full w-full overflow-y-auto" ref={containerScrollRef}>
        <div className="h-[calc(100%-76px)]">
          <Navbar title={title} />
          {/* the main content */}
          {contentSlot}
        </div>

        {/* action add transaction */}
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-full bg-transparent p-4 transition-transform",
            {
              "translate-y-[80px]": !isVisible,
            },
          )}
        >
          <div
            className="w-full cursor-pointer rounded-2xl bg-primary px-3 py-3 text-center text-white shadow-lg shadow-blue-500/40 transition-colors hover:bg-primary-dark"
            onClick={() => setIsOpen(true)}
          >
            {actionName}
          </div>
        </div>

        <CustomModal isOpen={isOpen} onOverlayClick={() => setIsOpen(false)}>
          {/* the modal content */}
          {modalContentSlot}
        </CustomModal>
      </div>
    </Transition>
  );
}
