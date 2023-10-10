import { Transition } from "@headlessui/react";
import IconButton from "../icon/icon-button";
import { Fragment, useState } from "react";
import Link from "next/link";

export default function Navbar({ title }: { title: string }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-5">
      <div className="text-2xl font-semibold text-dark1">{title}</div>

      <Transition
        appear
        as={Fragment}
        show={isShow}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200 delay-[200ms]"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-80"
          onClick={() => setIsShow(false)}
        />
      </Transition>

      <div className="relative z-20">
        <IconButton name="menu" onClick={() => setIsShow(true)} />

        <Transition
          appear
          as={Fragment}
          show={isShow}
          enter="ease-out duration-300"
          enterFrom="scale-x-[0.16] scale-y-[0.12]"
          enterTo="scale-x-100 scale-y-100"
          leave="ease-in duration-200"
          leaveFrom="scale-x-100 scale-y-100"
          leaveTo="scale-x-[0.16] scale-y-[0.12]"
        >
          <div className="absolute right-0 top-0 w-56 origin-top-right rounded-lg bg-white p-4">
            <Transition.Child
              as="div"
              enter="ease-out duration-300 delay-[250ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="-mr-2 -mt-2 flex justify-end">
                <IconButton
                  name="close"
                  className="bg-primary/50 text-primary hover:bg-primary/80 hover:text-white"
                />
              </div>
              <div className="mb-8 flex items-center">
                <div className="mr-2 h-12 w-12 shrink-0 rounded-2xl bg-primary/80"></div>
                <div className="flex grow flex-col">
                  <p className="text-xs font-medium text-dark2">Hello!</p>
                  <p className="w-full truncate font-semibold text-dark1">
                    Hatta Putra
                  </p>
                </div>
              </div>
              <nav>
                <ul>
                  <li className="mb-4 font-medium">
                    <Link href="/transactions">Transactions</Link>
                  </li>
                  <li className="mb-4 font-medium">
                    <Link href="/categories">Categories</Link>
                  </li>
                  <li className="mb-4 font-medium">
                    <Link href="#">Settings</Link>
                  </li>
                  <li className="mb-4 font-medium">
                    <Link href="#">About</Link>
                  </li>
                </ul>
              </nav>
            </Transition.Child>
          </div>
        </Transition>
      </div>
    </nav>
  );
}
