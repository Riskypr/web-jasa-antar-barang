"use client";

import { motion } from "framer-motion";

import {
  MapPin,
  Navigation,
} from "@/components/icons";

import {
  VEHICLE_CONFIG,
  STATUS_STYLE,
  formatTime,
} from "@/utils/history";

export const OrderCard = ({
  order,
  onClick,
}) => {

  const vehicleType =
    order.vehicle?.type;

  const vehicleName =
    order.vehicle?.name;

  const paymentStatus =
    order.payment?.status;

  const orderStatus =
    order.status;

  const {
    icon: Icon,
    bg,
  } =
    VEHICLE_CONFIG[
      vehicleType
    ] || VEHICLE_CONFIG.TRUCK;

  const statusClass =
    STATUS_STYLE[
      paymentStatus
    ] || STATUS_STYLE.default;

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="
        relative overflow-hidden
        rounded-3xl border
        border-gray-100 shadow-sm
        bg-white flex flex-col
        group cursor-pointer
      "
    >
      <div
        className="
          absolute top-0 left-0
          w-full h-48 bg-cover
          bg-center transition-transform
          duration-1000
          group-hover:scale-110
          opacity-50
        "
        style={{
          backgroundImage: `url('${bg}')`,
          filter: `grayscale(100%)`,
          WebkitMaskImage:
            "linear-gradient(to bottom, black 20%, transparent 100%)",
        }}
      />

      <div className="relative z-10 p-7 flex flex-col h-full">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">

          <div className="flex items-center gap-4">

            <div
              className="
                bg-white p-4 rounded-2xl
                shadow-lg
                group-hover:bg-gray-900
                group-hover:text-white
                transition-all
                transform group-hover:rotate-2
              "
            >
              {Icon && <Icon size={24} />}
            </div>

            <div>
              <p className="font-bold text-xl capitalize">
                {vehicleName}
              </p>

              <p className="text-[10px] text-gray-700 font-medium">
                {formatTime(order.createdAt)} WIB
              </p>
            </div>
          </div>

          <div
            className={`
              text-[10px] font-bold
              capitalize px-4 py-1
              rounded-full tracking-widest
              ${statusClass}
            `}
          >
            {paymentStatus || "PENDING"}
          </div>
        </div>

        {/* ADDRESS */}
        <div
          className="
            grid grid-cols-2 gap-4
            mb-8 bg-gray-50/50
            p-5 rounded-[28px]
          "
        >
          <AddressBlock
            label="Pickup"
            address={order.pickupAddress}
            icon={<MapPin size={12} />}
            color="text-gray-800"
          />

          <AddressBlock
            label="Dropoff"
            address={
              order.destinationAddress
            }
            icon={
              <Navigation size={12} />
            }
            color="text-gray-800"
            isLast
          />
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-auto pt-5
            border-t border-gray-50
            flex justify-between items-center
          "
        >
          <div>
            <span
              className="
                text-[10px]
                text-gray-400
                font-bold uppercase
                block
              "
            >
              Total Cost
            </span>

            <span
              className="
                text-xl font-bold
                text-gray-900
              "
            >
              Rp{" "}
              {order.totalPrice?.toLocaleString(
                "id-ID"
              )}
            </span>
          </div>

          <div
            className="
              px-4 py-2
              bg-gray-900 text-white
              text-xs font-bold
              rounded-xl capitalize
            "
          >
            {orderStatus}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AddressBlock = ({
  label,
  address,
  icon,
  color,
  isLast,
}) => (
  <div
    className={`
      space-y-1.5
      ${isLast
        ? "border-l border-gray-200/50 pl-4"
        : ""}
    `}
  >
    <div
      className={`
        flex items-center gap-2
        ${color}
      `}
    >
      {icon}

      <span
        className="
          text-[10px]
          font-bold capitalize
        "
      >
        {label}
      </span>
    </div>

    <p
      className="
        text-[11px]
        font-medium text-gray-600
        line-clamp-2
      "
    >
      {address}
    </p>
  </div>
);