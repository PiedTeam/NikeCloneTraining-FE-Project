import useDocumentTitle from "@hooks/useDocumentTitle";

const Homepage = () => {
  useDocumentTitle({ title: "Homepage" });
  return <div>Homepage</div>;
};

export default Homepage;
