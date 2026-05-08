"use client";

import { motion } from "framer-motion";

import {
  Users,
  Truck,
  ShoppingBag,
  CircleDollarSign,
} from "lucide-react";

const ICONS = {
  users: Users,
  truck: Truck,
  shopping: ShoppingBag,
  dollar: CircleDollarSign,
};

export default function StatsCard({
  title,
  value,
  icon,
  isBlack = false,
  subtitle,
}) {
  const Icon = ICONS[icon];

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      className={`
        relative overflow-hidden
        rounded-[30px]
        border
        p-6 md:p-7
        shadow-sm
        transition-all
        ${
          isBlack
            ? `
              bg-gradient-to-br from-black to-gray-800
              text-white border-black
            `
            : `
              bg-white border-gray-200/70
            `
        }
      `}
    >
      <div
        className="
          absolute -top-10 -right-10
          w-32 h-32 rounded-full
          bg-white/5 blur-3xl
        "
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p
            className={`
              text-[11px] uppercase
              tracking-[0.2em]
              font-bold
              ${
                isBlack
                  ? "text-gray-400"
                  : "text-gray-400"
              }
            `}
          >
            {title}
          </p>

          <h3
            className="
              mt-4
              text-3xl md:text-4xl
              font-black tracking-tight
            "
          >
            {value}
          </h3>

          {subtitle && (
            <p
              className={`
                mt-3 text-sm
                ${
                  isBlack
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              `}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`
            w-14 h-14 rounded-2xl
            flex items-center justify-center
            shrink-0
            ${
              isBlack
                ? "bg-white/10"
                : "bg-gray-100"
            }
          `}
        >
          {Icon && (
            <Icon
              size={24}
              className={
                isBlack
                  ? "text-white"
                  : "text-black"
              }
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}