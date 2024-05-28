import Header from "@components/Header";

const Homepage = () => {
  // TEST DATA
  const featureArray = [
    { featureName: "Find a Store", route: "/retail" },
    { featureName: "Help", route: "/help" },
    { featureName: "Join Us", route: "/membership" },
    { featureName: "Sign In", route: "/signin", separator: false },
  ];

  return (
    <div className="container">
      {/* tý thêm px-2 vô */}
      <Header featureArray={featureArray} />
      {/* <Navbar /> */}
    </div>
  );
};

export default Homepage;
