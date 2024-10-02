import { toast, ToastContainer } from "react-toastify";

export const notify = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
};
export const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      theme="colored"
    />
  );
};
