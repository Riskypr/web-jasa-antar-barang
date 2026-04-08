import Modal from "../ui/Modal";

const ServiceModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <Modal isOpen={!!item} onClose={onClose}>

      {/* IMAGE */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-6 text-white">
          <h3 className="text-2xl font-semibold">
            {item.name}
          </h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <p className="text-gray-900 mb-6">{item.description}</p>

        <div className="space-y-2 text-sm">
          {item.details.map((detail, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <p>{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold">
            Pesan Sekarang
          </button>
          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>

    </Modal>
  );
};

export default ServiceModal;