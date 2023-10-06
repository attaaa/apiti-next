import { Formik, Form, Field } from "formik";
import CategoryInput, { CategoryOption } from "../input/category-input";
import TypeInput, { TypeOption } from "../input/type-input";
import HorizontalScroll from "../layout/horizontal-scroll";
import * as Yup from "yup";
import { pushData } from "@/helper/localStorage";
import generateId from "@/helper/generator";

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
  const handleOnSubmit = (values: TransactionInput) => {
    console.log(values);
    pushData("transactions", {
      ...values,
      date: new Date(),
      id: generateId("transaction"),
    });
    onAddTransaction();
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleOnSubmit}
        validationSchema={transcationFormSchema}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="mb-4">
              <div className="text-dark1 mb-2 text-sm font-semibold">
                Transaction Type
              </div>
              <TypeInput name="type" options={typeOptions} />
            </div>

            <div className="mb-4">
              <div className="text-dark1 mb-2 text-sm font-semibold">
                Transaction Name
              </div>
              <Field
                autoComplete="string"
                type="text"
                name="name"
                id="name"
                placeholder="Breakfast"
                className=" block w-full rounded-xl border-2 px-4 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="text-dark1 mb-2 text-sm font-semibold">
                Amount
              </div>
              <Field
                type="number"
                name="amount"
                id="amount"
                placeholder="15000"
                className=" block w-full rounded-xl border-2 px-4 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="text-dark1 mb-2 text-sm font-semibold">
                Description
              </div>
              <Field
                type="text"
                name="description"
                id="description"
                placeholder="Ayam geprek cabe ijo"
                className=" block w-full rounded-xl border-2 px-4 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="text-dark1 text-sm font-semibold">Category</div>
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
    </>
  );
}
