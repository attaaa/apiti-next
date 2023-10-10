import { Formik, Form, Field } from "formik";
import CategoryInput, { CategoryOption } from "../input/category-input";
import TypeInput, { TypeOption } from "../input/type-input";
import * as Yup from "yup";
import { pushData } from "@/helper/localStorage";
import generateId from "@/helper/generator";
import { useState } from "react";
import IconSelectionInput from "../input/icon-selection-input";
import clsx from "clsx";

type CategoryInput = {
  icon: string;
  type: string;
  name: string;
  limitEnable: string[];
  limitAmount: number;
  limitPeriod: string;
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

const formInitialValues = {
  icon: "",
  type: typeOptions[0].value,
  name: "",
  limitEnable: [],
  limitAmount: 0,
  limitPeriod: "",
};

const transcationFormSchema = Yup.object().shape({
  type: Yup.string().required(""),
  name: Yup.string().required(""),
});

export default function AddCategoryForm({
  onAddCategory,
}: {
  onAddCategory: Function;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleOnSubmit = (values: CategoryInput) => {
    console.log(values);
    // pushData("categories", {
    //   ...values,
    //   id: generateId("categories"),
    // });
    // onAddCategory();
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleOnSubmit}
      validationSchema={transcationFormSchema}
    >
      {({ isValid, dirty, values }) => (
        <Form>
          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">
              Category Type
            </div>
            <TypeInput name="type" options={typeOptions} />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">
              Category Name
            </div>
            <Field
              autoComplete="string"
              type="text"
              name="name"
              id="name"
              placeholder="Groceries"
              className="block w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400  focus-visible:outline-none"
            />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-dark1">
              Category Icon
            </div>
            <IconSelectionInput name="icon" />
          </div>

          <div className={clsx(values.type === "expense" ? "block" : "hidden")}>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold text-dark1">
                Enable Limit
              </div>
              <Field
                type="checkbox"
                name="limitEnable"
                id="limitEnable"
                value="yes"
                className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <div
                className={clsx(
                  "mb-2 text-sm font-semibold",
                  values.limitEnable.length > 0
                    ? "text-dark1"
                    : "text-slate-400",
                )}
              >
                Limit Amount
              </div>
              <Field
                type="number"
                name="limitAmount"
                id="name"
                placeholder="Groceries"
                className="block w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400  focus-visible:outline-none"
              />
            </div>

            <div className="mb-4">
              <div className="mb-2 text-sm font-semibold text-dark1">
                Limit Period
              </div>
              <TypeInput name="limitPeriod" options={typeOptions} />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-2xl bg-primary px-3 py-3 text-center text-white transition-colors hover:bg-primary-dark disabled:bg-primary/40"
            disabled={!isValid || !dirty}
          >
            Add Category
          </button>
        </Form>
      )}
    </Formik>
  );
}
