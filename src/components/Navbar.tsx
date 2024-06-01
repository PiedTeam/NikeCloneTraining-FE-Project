import { SiNike } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart } from "react-icons/bs";
import { mainCategoryArray } from "../db/header";
import { SearchIcon } from "./icons/SearchIcon";
import { Input } from "@nextui-org/react";

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
  // const dataFetched: NavbarDataFetchType = {}; // GỌI API LẤY DỮ LIỆU fetch data một cục luôn, ko phải mở mainCategory nào thì ms fetch
  // const featureArray = dataFetched.featureArray;

  return (
    <div className="navbar-container">
      <div className="grid grid-cols-10 w-full h-16 px-16 gap-10">
        {/* LEFT SIDE */}
        <div className="col-span-1 h-16 flex justify-start items-center">
          <SiNike className="text-6xl" />
        </div>
        {/* CENTER */}
        <div className="col-span-6 flex flex-row justify-between items-center px-5">
          {mainCategoryArray.map((mainCategory) => (
            <div className="group h-full" key={mainCategory.id}>
              <button key={mainCategory.id} className="h-full flex flex-row items-center justify-around px-2">
                <a
                  href={mainCategory.route}
                  className="text-[#121212] border-2 cursor-pointer font-semibold text-lg border-transparent hover:border-2 hover:border-b-black hover:text-slate-500"
                >
                  {mainCategory.mainCategoryName}
                </a>
              </button>
              <div
                className={`invisible bg-white fixed z-50 grid grid-auto-rows ${mainCategory.subCategory && "pb-5"} gap-3 ${mainCategory.subCategory?.length === 5 ? "grid-cols-5" : "grid-cols-4"} w-full left-0 py-0 px-44 min-w-48 text-gray-800 shadow-xl group-hover:visible`}
              >
                {mainCategory.subCategory?.map(({ id, subCategoryName, tags }) => (
                  <div key={id}>
                    <li className="block text-black px-3 py-2 cursor-pointer font-semibold hover:text-black">
                      {subCategoryName}
                    </li>
                    {tags.map((tag) => (
                      <li
                        key={tag.id}
                        className="block px-3 mb-1 cursor-pointer text-sm font-semibold text-gray-500 hover:text-black"
                      >
                        {tag.name}
                      </li>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* RIGHT SIDE */}
        <div className="col-span-3 flex items-center justify-between">
          <Input
            classNames={{
              base: "w-[70%]",
              mainWrapper: "h-full",
              input: "text-xl",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search"
            size="md"
            startContent={<SearchIcon size={18} />}
            type="search"
            radius="full"
          />
          <button className="cursor:pointer">
            <FaRegHeart size={26} />
          </button>
          <button className="cursor:pointer">
            <BsCart size={26} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
