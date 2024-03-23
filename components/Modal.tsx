import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "./Modal.module.css";

const Modal: React.FC<{
  title: string;
  children: ReactNode;
  onClose: () => void;
}> = ({ title, children, onClose }) => {
  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <motion.dialog
        style={{ fontFamily: "Pretendard Variable" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="block m-auto rounded-lg p-5 w-96 z-10 inset-y-1/3"
      >
        <div className="first-line:text-xl font-bold text-center">{title}</div>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("__next") as HTMLElement
  );
};

export default Modal;
