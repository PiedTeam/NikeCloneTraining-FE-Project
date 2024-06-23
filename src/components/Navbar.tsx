import { SiNike } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa6";
import { BsCart } from "react-icons/bs";
import { mainCategoryArray } from "../db/header";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

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
      <div className="grid h-16 w-full grid-cols-10 gap-10 px-16">
        {/* LEFT SIDE */}
        <div className="col-span-1 flex h-16 items-center justify-start">
          <SiNike className="text-6xl" />
        </div>
        {/* CENTER */}
        <div className="col-span-6 flex flex-row items-center justify-between px-5">
          {mainCategoryArray.map((mainCategory) => (
            <div className="group h-full" key={mainCategory.id}>
              <button
                key={mainCategory.id}
                className="flex h-full flex-row items-center justify-around px-2"
              >
                <a
                  href={mainCategory.route}
                  className="cursor-pointer border-2 border-transparent text-lg font-semibold text-[#121212] hover:border-2 hover:border-b-black hover:text-slate-500"
                >
                  {mainCategory.mainCategoryName}
                </a>
              </button>
              <div
                className={`grid-auto-rows invisible fixed z-50 grid bg-white ${mainCategory.subCategory && "pb-5"} gap-3 ${mainCategory.subCategory?.length === 5 ? "grid-cols-5" : "grid-cols-4"} left-0 w-full min-w-48 px-44 py-0 text-gray-800 shadow-xl group-hover:visible`}
              >
                {mainCategory.subCategory?.map(
                  ({ id, subCategoryName, tags }) => (
                    <div key={id}>
                      <li className="block cursor-pointer px-3 py-2 font-semibold text-black hover:text-black">
                        {subCategoryName}
                      </li>
                      {tags.map((tag) => (
                        <li
                          key={tag.id}
                          className="mb-1 block cursor-pointer px-3 text-sm font-semibold text-gray-500 hover:text-black"
                        >
                          {tag.name}
                        </li>
                      ))}
                    </div>
                  ),
                )}
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
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search"
            size="md"
            startContent={<FaSearch />}
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
