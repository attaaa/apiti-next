import type { CustomFlowbiteTheme } from "flowbite-react";
import { Datepicker } from "flowbite-react";

const customTheme: CustomFlowbiteTheme["datepicker"] = {
  root: {
    input: {
      field: {
        input: {
          base: "w-full border-2",
          colors: {
            gray: "bg-transparent border-gray-300 text-gray-900 placeholder:text-gray-400  focus-visible:outline-none",
          },
          sizes: {
            md: "px-4 py-2.5",
          },
          withAddon: {
            off: "rounded-xl",
          },
        },
      },
    },
  },
  popup: {
    root: {
      base: "absolute bottom-full pb-4 z-50",
    },
  },
  views: {
    days: {
      items: {
        item: {
          selected: "bg-primary hover:bg-primary/80 text-white",
        },
      },
    },
    months: {
      items: {
        item: {
          selected: "bg-primary hover:bg-primary/80 text-white",
        },
      },
    },
    years: {
      items: {
        item: {
          selected: "bg-primary hover:bg-primary/80 text-white",
        },
      },
    },
  },
};

export default function DateInput({
  onSelectedDateChanged,
}: {
  onSelectedDateChanged: (date: Date) => void;
}) {
  return (
    <Datepicker
      theme={customTheme}
      icon={undefined}
      showClearButton={false}
      showTodayButton={false}
      sizing="md"
      type="text"
      onSelectedDateChanged={onSelectedDateChanged}
      maxDate={new Date()}
    />
  );
}
