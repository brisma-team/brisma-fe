import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Modal = ({ showModal, onClickOutside, header, footer, children }) => {
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
        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="absolute inset-0 w-full h-full bg-black opacity-80"></div>
          <motion.div
            className="flex flex-col justify-center items-center min-h-screen"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
            }}
            ref={ref}
          >
            <div className="flex flex-col justify-center">
              {header && (
                <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg mb-3">
                  {header}
                </div>
              )}
              <div
                className={`relative w-full p-4 mx-auto bg-white rounded-md shadow-lg overflow-y-scroll`}
              >
                {children}
              </div>
              {footer && (
                <div className="mt-3 flex justify-end ">
                  <div className="relative p-4 bg-white rounded-md shadow-lg">
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
