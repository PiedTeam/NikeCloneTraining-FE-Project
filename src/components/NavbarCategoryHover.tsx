import { Dispatch, SetStateAction } from "react";
import { MainCategory, NavbarDataFetchType, SubCategory } from "./Navbar";

interface NavbarCategoryHoverProps {
  mainCategory: MainCategory;
  dataFetched: NavbarDataFetchType;
  // stillInHover: boolean;
  setIsHoveredSub: Dispatch<SetStateAction<boolean>>;
}
const NavbarCategoryHover = (props: NavbarCategoryHoverProps) => {
  const { mainCategory, dataFetched, setIsHoveredSub } = props;
  // CHỖ NÀY ĐỂ GỌI API LẤY DỮ LIỆU THEO CATEGORY
  const subCategoryArray: SubCategory[] = [
    { subCategoryName: "New & Featured" },
    { subCategoryName: "Shop Icons" },
    { subCategoryName: "New For Men" },
    { subCategoryName: "New For Women" },
    { subCategoryName: "New For Kids" },
  ];
  return (
    <div>
      <div className="absolute invisible w-full h-36 bg-red-400 group-hover/main:visible">
        <ul className="flex flex-row justify-center h-full w-full bg-fuchsia-500">
          {subCategoryArray.map((subCategory, index) => {
            return (
              <li
                key={index}
                onMouseEnter={() => {
                  setIsHoveredSub(true);
                }}
                onMouseLeave={() => {
                  setIsHoveredSub(false);
                }}
                className="h-full flex flex-row items-start px-6 border-red-600 border-1 "
              >
                <a
                  href={subCategory.route}
                  className="text-[#121212] font-medium text-lg border-2 border-transparent hover:border-2 hover:border-b-black"
                >
                  {subCategory.subCategoryName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default NavbarCategoryHover;
