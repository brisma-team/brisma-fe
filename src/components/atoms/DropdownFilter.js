import { useEffect } from "react";
import { Card } from "@/components/atoms";
import Link from "next/link";

const DropdownFilter = ({
  show,
  onClickOutside,
  callbackRef,
  baseUrl,
  routes,
}) => {
  const ref = callbackRef;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!show) return null;

  return (
    <Card>
      <div className="-my-2 w-full">
        {routes.map((v, i) => {
          return (
            <Link
              key={i}
              className="border w-full border-y-0 text-base font-normal h-7 hover:bg-[#dedede] no-underline hover:no-underline text-black hover:text-black justify-center flex"
              href={`${baseUrl}/${v.slug}`}
            >
              {v.name}
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default DropdownFilter;
