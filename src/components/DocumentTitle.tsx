//components
import { Helmet } from "react-helmet";

type DocumentTitleProps = {
  title: string;
};

const DocumentTitle = ({ title }: DocumentTitleProps) => {
  return (
    <Helmet>
      <title>{title} | Pied Nike</title>
    </Helmet>
  );
};

export default DocumentTitle;
