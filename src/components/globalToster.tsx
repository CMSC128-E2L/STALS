import { Toaster } from "react-hot-toast";

const GlobalToaster: React.FC = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "green",
            color: "white",
          },
        },
        error: {
          style: {
            background: "red",
            color: "white",
          },
        },
      }}
    />
  );
};

export default GlobalToaster;
