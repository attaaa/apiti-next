import IconCategory from "../icon/icon-category";
import { Field } from "formik";

export type CategoryOption = {
  label: string;
  value: string;
  icon: string;
};

export default function CategoryInput({
  name,
  options,
}: {
  name: string;
  options: CategoryOption[];
}) {
  return (
    <>
      {options.map((option) => (
        <div className="relative" key={option.value}>
          <div className="flex w-20 flex-shrink-0 flex-col items-center justify-center py-2">
            <Field
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              className="peer absolute z-10 h-full w-full opacity-0"
            />
            <div className="mb-2 rounded-[20px] border-[3px] border-primary/40 p-0.5 transition-colors peer-checked:border-primary peer-hover:border-primary/50 peer-hover:peer-checked:border-primary peer-focus:border-primary/50 peer-focus:peer-checked:border-primary">
              <div className="rounded-2xl bg-blue-200 p-3 text-primary">
                <IconCategory name={option.icon} />
              </div>
            </div>

            <label
              htmlFor={option.label}
              className="text-dark2 block w-full truncate px-1 text-center text-xs font-medium transition-colors peer-checked:text-primary"
            >
              {option.label}
            </label>
          </div>
        </div>
      ))}
    </>
  );
}
