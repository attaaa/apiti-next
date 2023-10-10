// this is custom component that can be use with formik
import { Field } from "formik";
import IconCategory, { iconList } from "@/components/icon/icon-category";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function IconSelectionInput({ name }: { name: string }) {
  const [value, setValue] = useState("");
  const handleSelectionClick = (e: MouseEvent) => {
    const el = e.target as HTMLInputElement;
    setValue(el.value);

    setPopupShow(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [popupShow, setPopupShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickInsidePopup = popupRef.current?.contains(e.target as Node);
      const clickInsideTrigger = triggerRef.current?.contains(e.target as Node);
      if (!clickInsidePopup && !clickInsideTrigger) {
        setPopupShow(false);
      }
    };

    if (!popupRef && !popupShow) {
      document.removeEventListener("mousedown", handleClickOutside);
      return;
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, popupShow]);

  return (
    <div className="relative w-fit">
      <div className="flex items-center rounded-2xl bg-primary/5 p-2 pr-4">
        <div className="mr-2 rounded-[14px] p-0.5">
          <div className="rounded-lg bg-blue-200 p-2 text-primary">
            {value ? (
              <IconCategory name={value} className="w-4" />
            ) : (
              <div className="h-4 w-4" />
            )}
          </div>
        </div>
        <div
          className="text-sm text-primary"
          onClick={() => setPopupShow(true)}
          ref={triggerRef}
        >
          Change icon
        </div>
      </div>
      {/* popup selection */}
      <div
        className={clsx(
          "absolute bottom-[calc(100%+8px)] left-0 z-20 w-[312px] flex-wrap rounded-2xl bg-white p-2 drop-shadow-md",
          popupShow ? "flex" : "hidden",
        )}
        ref={popupRef}
      >
        {iconList.map((icon, idx) => (
          <div key={idx} className="relative p-2">
            <Field
              type="radio"
              name={name}
              id={icon}
              value={icon}
              className="peer absolute z-10 h-full w-full opacity-0"
              onClick={handleSelectionClick}
            />
            <div className="mb-2 rounded-[20px] border-[3px] border-primary/40 p-0.5 transition-colors peer-checked:border-primary peer-hover:border-primary/50 peer-hover:peer-checked:border-primary peer-focus:border-primary/50 peer-focus:peer-checked:border-primary">
              <div className="rounded-2xl bg-blue-200 p-3 text-primary">
                <IconCategory name={icon} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
