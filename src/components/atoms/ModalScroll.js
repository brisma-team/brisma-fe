import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ModalScroll = ({
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
      <div className="fixed inset-0 z-20 py-3 max-h-full overflow-y-scroll bg-black bg-opacity-80">
        <motion.div
          className={`flex justify-center ${
            positionCenter && "h-full items-center"
          }`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
          }}
          ref={ref}
        >
          <div className="flex flex-col gap-3">
            {header && (
              <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg">
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
                  <div className="relative flex justify-end">
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
    )
  );
};

export default ModalScroll;
