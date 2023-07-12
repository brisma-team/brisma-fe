import { useEffect } from "react";
import Link from "next/link";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

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
    <div
      className="py-2 w-40 rounded flex flex-col items-center fixed z-10  bg-white"
      style={{
        color: token("color.text", N800),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
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
    </div>
  );
};

export default DropdownFilter;
