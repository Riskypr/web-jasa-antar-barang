const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full relative shadow-xl animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 hover:bg-black hover:text-white transition w-10 h-10 rounded-full flex items-center justify-center text-lg shadow"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;