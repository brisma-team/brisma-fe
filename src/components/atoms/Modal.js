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
  maxHeight,
  overflowScrollY,
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
          className={`$ fixed inset-0 z-20 ${
            !positionCenter
              ? "flex justify-center items-start py-8"
              : "overflow-y-auto"
          }`}
        >
          <div className="absolute inset-0 w-full h-full bg-black opacity-80"></div>
          <motion.div
            className={`flex flex-col ${
              !positionCenter
                ? "min-h-full max-h-full overflow-y-hidden"
                : "justify-center items-center min-h-screen"
            } overflow-x-hidden`}
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
                className={`relative w-full mx-auto rounded-md shadow-lg ${
                  overflowScrollY &&
                  (maxHeight || `max-h-[39.5rem]`)`overflow-y-scroll relative`
                }`}
              >
                {children}
              </div>
              {withoutFooter
                ? ""
                : footer && (
                    <div className="relative flex justify-end mt-3">
                      <div
                        className={`p-4 bg-white rounded-md shadow-lg ${
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
