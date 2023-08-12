interface ModalProps {
  children: React.ReactNode;
  modalOpen: boolean;
  setModalOpen(value: boolean): void;
}

const Modal: React.FC<ModalProps> = ({ children, modalOpen, setModalOpen }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
