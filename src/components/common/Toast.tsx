import { ToastType } from "@providers/ToastProvider";

const Toast = ({
  color,
  id,
  message,
  // timeout,
  deleteToast,
}: {
  color: ToastType["color"];
  id: number;
  message: string;
  timeout: number;
  deleteToast: (id: number) => void;
}) => {
  return (
    <>
      <div
        id={"toast-" + color}
        className={`mb-4 flex w-full max-w-2xl animate-toast items-center rounded-lg ${color === "success" && "bg-green-100"} ${color === "danger" && "bg-red-100"} ${color === "warning" && "bg-orange-100"} p-4 pr-4 text-gray-500 shadow`}
        role="alert"
      >
        <div
          className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${color === "success" && "text-green-500"} ${color === "danger" && "text-red-500"} ${color === "warning" && "text-orange-500"}`}
        >
          {color === "success" && (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          )}
          {color === "danger" && (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          )}
          {color === "warning" && (
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
          )}
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 pr-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-slate-300 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={() => deleteToast(id)}
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Toast;
