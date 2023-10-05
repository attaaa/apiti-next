import { Formik, Form, Field } from "formik";
import CategoryInput, { CategoryOption } from "../input/category-input";
import TypeInput, { TypeOption } from "../input/type-input";
import HorizontalScroll from "../layout/horizontal-scroll";
import * as Yup from "yup";

type TransactionInput = {
  transactionType: string;
  transactionName: string;
  amount: string;
  description: string;
  transactionCategory: string;
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
  transactionType: typeOptions[0].value,
  transactionName: "",
  amount: "",
  description: "",
  transactionCategory: "",
};

const transcationFormSchema = Yup.object().shape({
  transactionType: Yup.string().required(""),
  transactionName: Yup.string().required(""),
  amount: Yup.string().required(""),
  description: Yup.string().required(""),
  transactionCategory: Yup.string(),
});

export default function AddTransactionForm() {
  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: TransactionInput) => {
          console.log(values);
        }}
        validationSchema={transcationFormSchema}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="mb-4">
              <div className="mb-2 text-sm font-semibold">Transaction Type</div>
              <TypeInput name="transactionType" options={typeOptions} />
            </div>

            <div className="mb-4">
              <div className="mb-2 text-sm font-semibold">Transaction Name</div>
              <Field
                type="text"
                name="transactionName"
                id="transactionName"
                placeholder="Breakfast"
                className=" block w-full rounded-xl border-2 px-4 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="mb-2 text-sm font-semibold">Amount</div>
              <Field
                type="number"
                name="amount"
                id="amount"
                placeholder="15000"
                className=" block w-full rounded-xl border-2 px-4 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="mb-2 text-sm font-semibold">Description</div>
              <Field
                type="text"
                name="description"
                id="description"
                placeholder="Ayam geprek cabe ijo"
                className=" block w-full rounded-xl border-2 px-4 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold">Category</div>
              <HorizontalScroll className="relative -left-4 w-[calc(100%+2rem)] overflow-x-auto">
                <div className="mx-1 flex">
                  <CategoryInput
                    name="transactionCategory"
                    options={categoryOptions}
                  />
                </div>
              </HorizontalScroll>
            </div>

            <button
              type="submit"
              className="mt-2 w-full cursor-pointer rounded-2xl bg-primary px-3 py-3 text-center text-white shadow-md shadow-blue-500/40 transition-colors hover:bg-primary-dark disabled:bg-primary/40"
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
