import AdvertiseBar from "@components/AdvertiseBar";
import Header from "../layout/Header";
import Navbar from "@components/Navbar";
import { featureArray } from "../db/header";

const Homepage = () => {
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
