import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Modal = ({
  showModal,
  onClickOutside,
  header,
  footer,
  withoutFooter,
  widthFullFooter,
  children,
  positionCenter,
}) => {
  const ref = useRef(null);
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

  if (!showModal) return null;

  return (
    showModal && (
      <>
        <div
          className={`${
            !positionCenter ? "fixed" : ""
          } inset-0 z-20 flex justify-center items-start py-8`}
        >
          <div className="absolute inset-0 w-full h-full bg-black opacity-80"></div>
          <motion.div
            className="flex flex-col min-h-full max-h-[55rem] overflow-y-scroll"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
            }}
            ref={ref}
          >
            <div className="flex flex-col justify-center ">
              {header && (
                <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg mb-3">
                  {header}
                </div>
              )}
              <div
                className={`relative w-full p-4 mx-auto bg-white rounded-md shadow-lg`}
              >
                {children}
              </div>
              {withoutFooter
                ? ""
                : footer && (
                    <div className="mt-3 flex justify-end ">
                      <div
                        className={`relative p-4 bg-white rounded-md shadow-lg ${
                          widthFullFooter && `w-full`
                        }`}
                      >
                        {footer}
                      </div>
                    </div>
                  )}
            </div>
          </motion.div>
        </div>
      </>
    )
  );
};

export default Modal;
