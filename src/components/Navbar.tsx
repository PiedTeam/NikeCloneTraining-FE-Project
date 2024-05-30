import { SiNike } from "react-icons/si";
import NavbarCategoryHover from "./NavbarCategoryHover";
import { useState } from "react";

export interface MainCategory {
  mainCategoryName: string;
  route?: string; // TRONG TRƯỜNG HỢP CHƯA CÓ TRANG RIÊNG
}

export interface SubCategory {
  subCategoryName: string;
  route?: string; // TRONG TRƯỜNG HỢP CHƯA CÓ TRANG RIÊNG
}

export interface NavbarDataFetchType {
  mainCategoryArray: MainCategory[];
  subCategoryArray: SubCategory[];
}

const Navbar = () => {
  const [isHoveredMain, setIsHoveredMain] = useState(false);
  const [isHoveredSub, setIsHoveredSub] = useState(false);
  const [currentMainCategory, setCurrentMainCategory] = useState(-1);

  // const dataFetched: NavbarDataFetchType = {}; // GỌI API LẤY DỮ LIỆU fetch data một cục luôn, ko phải mở mainCategory nào thì ms fetch
  // const featureArray = dataFetched.featureArray;

  // // SAMPLE DATA
  const dataFetched: NavbarDataFetchType = {
    mainCategoryArray: [{ mainCategoryName: "New & Featured", route: "/retail" }],
    subCategoryArray: [
      { subCategoryName: "New & Featured" },
      { subCategoryName: "Shop Icons" },
      { subCategoryName: "New For", route: "/" },
    ],
  };

  const mainCategoryArray: MainCategory[] = [
    { mainCategoryName: "New & Featured", route: "/retail" },
    { mainCategoryName: "Men", route: "/men" },
    { mainCategoryName: "Women", route: "/women" },
    { mainCategoryName: "Kids", route: "/" },
    { mainCategoryName: "Sale", route: "/sales" },
    { mainCategoryName: "Customize", route: "/nike-by-you" },
    { mainCategoryName: "SNKRS" },
  ];

  return (
    <div className="navbar-container ">
      <div className="bg-red-700 w-full h-14 flex flex-row">
        {/* LEFT SIDE */}
        <div className="basis-3/12 w-full bg-green-800 flex justify-start items-center">
          <SiNike className="text-6xl" />
        </div>
        {/* CENTER */}
        <div className="basis-6/12 h-full w-full bg-purple-500">
          <ul className="flex flex-row justify-center h-full w-full">
            {mainCategoryArray.map((mainCategory, index) => (
              <li
                key={index}
                className="h-full flex flex-row items-center px-2 bg-blue-600 hover:bg-green-500"
                onMouseEnter={() => {
                  setIsHoveredMain(true);
                  setCurrentMainCategory(index);
                  console.log("currentMainCategory", currentMainCategory);
                }}
                onMouseLeave={() => {
                  setIsHoveredMain(false);
                }}
              >
                <a
                  href={mainCategory.route}
                  className="text-[#121212] font-medium text-lg border-2 border-transparent hover:border-2 hover:border-b-black"
                >
                  {mainCategory.mainCategoryName}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* RIGHT SIDE */}
        <div className="basis-3/12 w-full bg-amber-700"></div>
      </div>
      {(isHoveredMain || isHoveredSub) && (
        <NavbarCategoryHover
          setIsHoveredSub={setIsHoveredSub}
          dataFetched={dataFetched}
          mainCategory={{ mainCategoryName: "New & Featured", route: "/retail" }}
        />
      )}
    </div>
  );
};
export default Navbar;
