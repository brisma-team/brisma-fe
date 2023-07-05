import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Modal = ({ showModal, onClickOutside, header, children }) => {
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
          <div className="fixed inset-0 w-full h-full bg-black overflow-hidden opacity-80"></div>
          <motion.div
            className="flex flex-col justify-center items-center min-h-screen"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
            }}
            ref={ref}
          >
            {header && (
              <div className="relative max-w-4xl p-4 mx-auto bg-white rounded-md shadow-lg mb-3">
                <div className="h-full w-full">{header}</div>
              </div>
            )}
            <div
              className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-md shadow-lg overflow-y-scroll"
              style={{ maxHeight: "36rem" }}
            >
              <div className="h-full w-full">{children}</div>
            </div>
          </motion.div>
        </div>
      </>
    )
  );
};

export default Modal;
