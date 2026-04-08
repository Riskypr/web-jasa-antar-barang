import useModal from "@/hooks/useModal";
import ServiceModal from "./services/ServiceModal";
import { servicesData } from "@/data/services";
import ServiceCard from "./services/ServiceCard";

const Services = () => {
  const { data: selectedItem, open, close } = useModal();

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-2xl md:text-[50px] font-bold text-center mb-8 md:mb-16 md:mt-2 text-slate-900">
          Apa yang bisa kami antar untukmu?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              onClick={open}
            />
          ))}

        </div>
        <ServiceModal
          item={selectedItem}
          onClose={close}
        />
      </div>
    </section>
  );
};

export default Services;