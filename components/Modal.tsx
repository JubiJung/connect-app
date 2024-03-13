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
      <dialog className="block m-auto rounded-lg p-5 w-96 z-10 inset-y-1/3">
        <div className="text-xl font-bold text-center">{title}</div>
        {children}
      </dialog>
    </>,
    document.getElementById("__next") as HTMLElement
  );
};

export default Modal;
