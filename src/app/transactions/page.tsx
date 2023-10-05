"use client";

import Navbar from "@/components/layout/navbar";
import IconCategory from "@/components/icon/icon-category";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CustomModal from "@/components/modal/custom-modal";
import AddTransactionForm from "@/components/transaction/add-transaction-form";

function TransactionItem() {
  const dataTransactions = [
    {
      id: "001",
      name: "Nasi Goreng",
      date: new Date(),
      amount: 13000,
      description: "",
    },
    {
      id: "002",
      name: "Ayam Crispy",
      date: new Date(),
      amount: 24000,
      description: "",
    },
    {
      id: "003",
      name: "Ayam Geprek",
      date: new Date(),
      amount: 15000,
      description: "",
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const transactionList = dataTransactions.map((transaction) => (
    <div
      className="transaction-item mb-2 flex w-full items-center gap-3 rounded-[20px] bg-white p-4"
      key={transaction.id}
    >
      <div className="transaction-item__icon rounded-[18px] bg-primary-light p-2.5 text-primary">
        <IconCategory name="gift" />
      </div>

      <div className="transaction-item__details">
        <div className="mb-0.5 text-sm font-semibold">{transaction.name}</div>
        <div className="text-xs">{formatDate(transaction.date)}</div>
      </div>

      <div className="transaction-item__amount ml-auto font-semibold">
        {transaction.amount}
      </div>
    </div>
  ));

  return transactionList;
}

const TransactionCategory = () => {
  return (
    <div className="mb-5">
      <div className="mt-2 px-4">
        <div className="mb-3 flex w-full items-center justify-between">
          <div className="text-lg font-semibold">Recent</div>
          <div className="cursor-pointer text-sm text-primary transition-colors hover:text-primary-dark">
            See all
          </div>
        </div>

        <div>
          <TransactionItem />
        </div>
      </div>
    </div>
  );
};

export default function TransactionsPage() {
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
    <div className="h-full w-full overflow-y-auto" ref={containerScrollRef}>
      <div>
        <Navbar />
        <TransactionCategory />
        <TransactionCategory />
        <TransactionCategory />
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
        <AddTransactionForm />
      </CustomModal>
    </div>
  );
}
