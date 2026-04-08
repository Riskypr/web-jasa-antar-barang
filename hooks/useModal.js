import { useState } from "react";

const useModal = () => {
  const [data, setData] = useState(null);

  const open = (item) => {
    setData(item);
  };

  const close = () => {
    setData(null);
  };

  const isOpen = !!data;

  return {
    data,
    isOpen,
    open,
    close,
  };
};

export default useModal;