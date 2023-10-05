export type TypeOption = {
  label: string;
  value: string;
};

export default function TypeInput({
  name,
  options,
}: {
  name: string;
  options: TypeOption[];
}) {
  return (
    <div className="flex w-fit space-x-1 rounded-2xl bg-blue-100 p-1">
      {options.map((option) => (
        <div className="relative" key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            className="peer absolute z-10 h-full w-full opacity-0"
          />
          <label
            className="block w-28 cursor-pointer rounded-xl py-2.5 text-center text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 transition-colors focus:outline-none peer-checked:bg-primary peer-checked:text-white peer-hover:bg-white/75 peer-hover:peer-checked:bg-primary peer-focus:ring-2"
            htmlFor={option.value}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
