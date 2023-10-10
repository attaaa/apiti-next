"use client";

import AddCategoryForm from "@/components/categories/add-categories-form";
import IconCategory from "@/components/icon/icon-category";
import Navbar from "@/components/layout/navbar";
import CustomModal from "@/components/modal/custom-modal";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useState, useRef, useEffect, Fragment } from "react";

export type Category = {
  id: string;
  icon: string;
  name: string;
  type: "expense" | "income";
  limitEnable: boolean;
  limitValue: number | null;
  limitPeriod: "daily" | "weekly" | "monthly" | null;
};

const CATEGORIES_DUMMY: Category[] = [
  {
    id: "c1",
    icon: "food",
    name: "Food",
    type: "expense",
    limitEnable: false,
    limitValue: null,
    limitPeriod: null,
  },
  {
    id: "c2",
    icon: "shopping-cart",
    name: "Groceries",
    type: "expense",
    limitEnable: false,
    limitValue: null,
    limitPeriod: null,
  },
  {
    id: "c3",
    icon: "entertainment",
    name: "Entertainment",
    type: "expense",
    limitEnable: false,
    limitValue: null,
    limitPeriod: null,
  },
  {
    id: "c4",
    icon: "education",
    name: "Education",
    type: "expense",
    limitEnable: false,
    limitValue: null,
    limitPeriod: null,
  },
  // income
  {
    id: "c5",
    icon: "gift",
    name: "Gift",
    type: "income",
    limitEnable: false,
    limitValue: null,
    limitPeriod: null,
  },
  {
    id: "c6",
    icon: "salary",
    name: "Salary",
    type: "income",
    limitEnable: false,
    limitValue: null,
    limitPeriod: null,
  },
];

function CategoriesGroup({
  title,
  categories,
}: {
  title: string;
  categories: Category[];
}) {
  return (
    <div className="mx-4 mb-5">
      <div className="mb-3 text-lg font-semibold text-dark1">{title}</div>
      <div className=" grid grid-cols-2 grid-rows-[auto] gap-2">
        {categories.map((category) => (
          <div
            className="flex items-center rounded-2xl bg-white p-2"
            key={category.id}
          >
            <IconCategory
              className="mr-2 w-10 rounded-xl bg-primary-light p-2.5 text-primary"
              name={category.icon}
            />
            <div className="w-full grow truncate">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currScrollPos, setCurrScrollPos] = useState(0);
  const containerScrollRef = useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(CATEGORIES_DUMMY);
  }, []);

  const categoriesIncome = () => {
    return categories.filter((category) => category.type === "income");
  };

  const categoriesExpense = () => {
    return categories.filter((category) => category.type === "expense");
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

  const handleAddCategory = () => {
    console.log("add category handler");
  };

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
          <Navbar title="Categories" />
          {categoriesExpense().length > 0 && (
            <CategoriesGroup title="Expense" categories={categoriesExpense()} />
          )}
          {categoriesIncome().length > 0 && (
            <CategoriesGroup title="Income" categories={categoriesIncome()} />
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
            Add Category
          </div>
        </div>

        <CustomModal isOpen={isOpen} onOverlayClick={() => setIsOpen(false)}>
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </CustomModal>
      </div>
    </Transition>
  );
}
