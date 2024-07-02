import { useToast } from "@providers/ToastProvider";
import Toast from "./Toast";
import { useCallback, useEffect } from "react";

const ToastContainer = () => {
  const { list, setList } = useToast();

  const deleteToast = useCallback(
    (id: number) => {
      const todoListItem = list.filter((item) => item.id !== id);
      setList(todoListItem);
    },
    [list, setList],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length) {
        deleteToast(list[0].id);
      }
    }, list[0]?.timeout);

    return () => {
      clearInterval(interval);
    };
  }, [list, deleteToast]);

  return (
    <div className="fixed right-10 top-10 z-10 w-80">
      {list.map((toast) => (
        <Toast
          key={toast.id}
          color={toast.color}
          id={toast.id}
          message={toast.message}
          timeout={toast.timeout}
          deleteToast={deleteToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
