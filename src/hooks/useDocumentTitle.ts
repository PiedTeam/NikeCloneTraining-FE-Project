import { useEffect } from "react";

type DocumentTitleProps = {
  title: string;
};

const useDocumentTitle = ({ title }: DocumentTitleProps) => {
  useEffect(() => {
    document.title = `${title} | Pied Nike`;
  }, [title]);
};

export default useDocumentTitle;
