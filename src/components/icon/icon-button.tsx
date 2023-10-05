import { ReactElement } from "react";

export default function IconButton({
  name,
  ...props
}: {
  name: string;
} & React.ComponentProps<"svg">) {
  let iconDefinition: ReactElement;

  switch (name) {
    case "menu":
      iconDefinition = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M12 12H20.25M5.75 17.25H20.25"
        />
      );
      break;

    case "close":
      iconDefinition = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      );
      break;

    default:
      iconDefinition = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      );
      break;
  }

  return (
    <div className="hover:bg-primary-dark neutral cursor-pointer rounded-[14px] bg-primary p-1.5 text-neutral-50 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.85}
        stroke="currentColor"
        className="h-6 w-6"
        {...props}
      >
        {iconDefinition}
      </svg>
    </div>
  );
}
