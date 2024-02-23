import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal: React.FC<{
  title: string;
  children: ReactNode;
  onClose: () => void;
}> = ({ title, children, onClose }) => {
  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <dialog className={styles.modal}>
        <h2>{title}</h2>
        {children}
      </dialog>
    </>,
    document.getElementById("__next") as HTMLElement
  );
};

export default Modal;
