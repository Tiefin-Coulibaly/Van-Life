import { ToastContainer } from "react-toastify";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ToastContainer
        autoClose={1000}
        theme="colored"
        position="top-center"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </div>
  );
};

export default layout;
