import { Formik, Form, Field } from "formik";
import CategoryInput, { CategoryOption } from "../input/category-input";
import TypeInput, { TypeOption } from "../input/type-input";
import HorizontalScroll from "../layout/horizontal-scroll";
import * as Yup from "yup";
import { pushData } from "@/helper/localStorage";
import generateId from "@/helper/generator";
import { useState } from "react";
import DateInput from "../input/date-input";

type TransactionInput = {
  type: string;
  name: string;
  amount: string;
  description: string;
  category: string;
};

const typeOptions: TypeOption[] = [
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Income",
    value: "income",
  },
];

const categoryOptions: CategoryOption[] = [
  {
    value: "food",
    label: "Food",
    icon: "gift",
  },
  {
    value: "groceries",
    label: "Groceries",
    icon: "gift",
  },
  {
    value: "rent",
    label: "Rent",
    icon: "home",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: "film",
  },
  {
    value: "utilities",
    label: "Utilities",
    icon: "bolt",
  },
  {
    value: "transportation",
    label: "Transportation",
    icon: "car",
  },
  {
    value: "salary",
    label: "Salary",
    icon: "briefcase",
  },
];

const formInitialValues = {
  type: typeOptions[0].value,
  name: "",
  amount: "",
  description: "",
  category: "",
};

const transcationFormSchema = Yup.object().shape({
  type: Yup.string().required(""),
  name: Yup.string().required(""),
  amount: Yup.string().required(""),
  description: Yup.string().required(""),
  category: Yup.string(),
});

export default function AddTransactionForm({
  onAddTransaction,
}: {
  onAddTransaction: Function;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleOnSubmit = (values: TransactionInput) => {
    pushData("transactions", {
      ...values,
      date: selectedDate,
      id: generateId("transaction"),
    });
    onAddTransaction();
  };

  const handleSelectedDate = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleOnSubmit}
      validationSchema={transcationFormSchema}
    >
      {({ isValid, dirty }) => (
        <Form>
          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">
              Transaction Type
            </div>
            <TypeInput name="type" options={typeOptions} />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">
              Transaction Name
            </div>
            <Field
              autoComplete="string"
              type="text"
              name="name"
              id="name"
              placeholder="Breakfast"
              className="block w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400  focus-visible:outline-none"
            />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">Amount</div>
            <Field
              type="number"
              name="amount"
              id="amount"
              placeholder="15000"
              className=" block w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus-visible:outline-none"
            />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">
              Description
            </div>
            <Field
              type="text"
              name="description"
              id="description"
              placeholder="Ayam geprek cabe ijo"
              className="block w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400  focus-visible:outline-none"
            />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">Date</div>
            <div className=" w-full">
              <DateInput onSelectedDateChanged={handleSelectedDate} />
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-semibold text-dark1">Category</div>
            <HorizontalScroll className="relative -left-4 w-[calc(100%+2rem)] overflow-x-auto">
              <div className="mx-1 flex">
                <CategoryInput name="category" options={categoryOptions} />
              </div>
            </HorizontalScroll>
          </div>

          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-2xl bg-primary px-3 py-3 text-center text-white transition-colors hover:bg-primary-dark disabled:bg-primary/40"
            disabled={!isValid || !dirty}
          >
            Add Transaction
          </button>
        </Form>
      )}
    </Formik>
  );
}
