import { useState, ReactNode, FC } from "react";
import { BiSolidUser } from "react-icons/bi";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
interface SideBarProps {
  CustomComponent?: ReactNode;
}
const SideBar: FC<SideBarProps> = ({ CustomComponent }) => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const Menu = [
    { title: "Dashboard" },
    { title: "Pages" },
    { title: "Media", spacing: true },
    {
      title: "Projects",
      submenu: true,
      submenuItems: [
        {
          title: "Submenu 1",
        },
        {
          title: "Submenu 2",
        },
        {
          title: "Submenu 3",
        },
      ],
    },
  ];

  return (
    <div className="mr-8 flex ">
      <div
        className={`h-screen bg-zinc-200 p-5 pt-8 ${open ? "w-72" : "w-20"} relative duration-300`}
      >
        <BsArrowLeftShort
          className={`text-dark-purple border-dark-purple absolute -right-8 top-9 cursor-pointer rounded-full border bg-white text-5xl ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt=""
            className={`float-left mr-2  block w-1/4 cursor-pointer rounded-full text-xl duration-500 ${!open && "w-16 rotate-[360deg] "}`}
          />

          <h1
            className={`origin-left text-2xl font-medium text-black duration-500 ${!open && "hidden scale-0"}`}
          >
            Tiến Đẹp Trai
          </h1>
        </div>
        <ul className="pt-2">
          {Menu.map((item, index) => (
            <div key={index}>
              <li
                key={index}
                className={`text-gray flex cursor-pointer items-center gap-x-4 rounded-md p-2 px-5 text-sm hover:bg-white ${item.spacing ? "mt-9" : "mt-2"}`}
              >
                <span className="float-left block text-2xl">
                  <RiDashboardFill />
                </span>
                <span
                  className={`flex-1 text-base font-medium ${!open && "hidden"}`}
                >
                  {item.title}
                </span>
                {item.submenu && open && (
                  <BsChevronDown
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => {
                      setSubMenuOpen(!subMenuOpen);
                    }}
                  />
                )}
              </li>
              {item.submenu && subMenuOpen && open && (
                <ul>
                  {item.submenuItems?.map((subItem, subIndex) => (
                    <li className="pl-8" key={subIndex}>
                      {subItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
      {CustomComponent && <div className="m-8">{CustomComponent}</div>}
    </div>
  );
};

export default SideBar;
