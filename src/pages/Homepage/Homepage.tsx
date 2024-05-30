import AdvertiseBar from "@components/AdvertiseBar";
import Header from "@components/Header";
import Navbar from "@components/Navbar";

const Homepage = () => {
  // TEST DATA
  const featureArray = [
    { featureName: "Find a Store", route: "/retail" },
    { featureName: "Help", route: "/help" },
    { featureName: "Join Us", route: "/membership" },
    { featureName: "Sign In", route: "/signin", separator: false },
  ];

  return (
    <div className="">
      {/* tý thêm px-2 vô */}
      <Header featureArray={featureArray} />
      <Navbar />
      <AdvertiseBar />
    </div>
  );
};

export default Homepage;
