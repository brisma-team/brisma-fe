import React from "react";
import { IconArrowRight, IconArrowLeft } from "@/components/icons";
import Button from "@atlaskit/button";
import { motion } from "framer-motion";
import { LoginForm } from "../auth";
import { useState } from "react";

const SidebarLanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animate = {
    enter: {
      rotateY: 0,
      transition: {
        duration: 0.5,
      },
      width: "31rem",
    },
    exit: {
      transition: {
        duration: 0.3,
      },
      width: "3.5rem",
    },
  };

  return (
    <motion.div
      className={`p-2 h-full absolute`}
      style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
      initial="exit"
      animate={isOpen ? "enter" : "exit"}
      variants={animate}
    >
      <div className="w-full justify-end flex ml-7 mt-8">
        <div className="w-10 h-10 rounded-full border-4 bg-white border-atlasian-blue-light flex items-center justify-center">
          <Button
            shouldFitContainer
            iconAfter={
              isOpen ? (
                <IconArrowLeft primaryColor="#0C66E4" size="large" />
              ) : (
                <IconArrowRight primaryColor="#0C66E4" size="large" />
              )
            }
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      {isOpen && <LoginForm />}
    </motion.div>
  );
};

export default SidebarLanding;
