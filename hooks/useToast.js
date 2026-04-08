import { toast } from 'react-toastify';

export const useToast = () => {

  const success = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  const error = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const info = (message) => {
    toast.info(message, {
      position: "top-right",
    });
  };

  const warning = (message) => {
    toast.warning(message, {
      position: "top-right",
    });
  };

  const loading = (message = "Loading...") => {
    return toast.loading(message);
  };

  const update = (toastId, message, type = "success") => {
    toast.update(toastId, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 3500,
    });
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    update,
  };
};