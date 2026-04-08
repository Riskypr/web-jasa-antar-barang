const ServiceCard = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <div
      onClick={() => onClick(item)}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={`/${item.image}`}
          alt={item.name}
          className="w-full h-44 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold">
          Layanan
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-black transition">
              <Icon className="text-black group-hover:text-white" size={18} />
            </div>
          )}

          <h3 className="text-lg font-semibold text-slate-900">
            {item.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-4 text-sm font-medium text-black">
          Lihat detail →
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;