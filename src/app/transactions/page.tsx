"use client";

import Navbar from "@/components/layout/navbar";
import IconCategory from "@/components/icon/icon-category";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CustomModal from "@/components/modal/custom-modal";
import AddTransactionForm from "@/components/transaction/add-transaction-form";
import EmptyTransaction from "../../assets/illustration/empty-transaction.svg";
import { getLocalData } from "@/helper/localStorage";
import { Transition } from "@headlessui/react";

export type Transaction = {
  id: string;
  type: string;
  name: string;
  date: string;
  amount: number;
  description: string;
  category: string;
};

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="transaction-item mb-2 flex w-full items-center gap-3 rounded-[20px] bg-white p-4">
      <div className="transaction-item__icon rounded-[18px] bg-primary-light p-2.5 text-primary">
        <IconCategory name="gift" />
      </div>

      <div className="transaction-item__details text-dark1">
        <div className="mb-0.5 text-sm font-semibold">{transaction.name}</div>
        <div className="text-xs">{formatDate(transaction.date)}</div>
      </div>

      <div className="transaction-item__amount ml-auto font-semibold text-dark1">
        {transaction.amount}
      </div>
    </div>
  );
}

function TransactionCategory({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="mb-5">
      <div className="mt-2 px-4">
        <div className="mb-3 flex w-full items-center justify-between">
          <div className="text-lg font-semibold text-dark1">Recent</div>
          <div className="cursor-pointer text-sm text-primary transition-colors hover:text-primary-dark">
            See all
          </div>
        </div>

        <div>
          {transactions.map((transaction: Transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currScrollPos, setCurrScrollPos] = useState(0);
  const containerScrollRef = useRef<HTMLDivElement | null>(null);

  const [transactionsData, setTransactionsData] = useState<
    Transaction[] | null
  >(null);

  const refreshTransactionData = () => {
    setIsOpen(false);
    setTransactionsData(() => getLocalData("transactions"));
  };

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

  useEffect(() => {
    setTransactionsData(() => getLocalData("transactions"));
  }, []);

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
          <Navbar title="Transaction" />
          {transactionsData ? (
            <>
              <TransactionCategory transactions={transactionsData} />
              <div className="h-10" />
            </>
          ) : (
            <div className="grid h-full w-full place-items-center">
              <div className="pb-20 text-center">
                <EmptyTransaction className="mx-auto mb-8 w-2/3" />
                <p className="py-5 text-lg font-semibold text-dark1">
                  Nothing to Show Yet
                </p>
                <p className="px-12 text-sm font-medium text-dark2">
                  Enter your first transaction by tapping the add transaction
                  button below!
                </p>
              </div>
            </div>
          )}
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
            Add Transaction
          </div>
        </div>

        <CustomModal isOpen={isOpen} onOverlayClick={() => setIsOpen(false)}>
          <AddTransactionForm onAddTransaction={refreshTransactionData} />
        </CustomModal>
      </div>
    </Transition>
  );
}
