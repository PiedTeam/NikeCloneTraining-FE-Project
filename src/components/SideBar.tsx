import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
const SideBar = () => {
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
    <div className="flex">
      <div
        className={`bg-zinc-200 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-5xl rounded-full absolute -right-8 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <BiSolidUser
            className={`text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}
          ></BiSolidUser>
          <h1
            className={`text-white origin-left font-medium text-2xl duration-500 ${!open && "scale-0"}`}
          >
            haha
          </h1>
        </div>
        <ul className="pt-2">
          {Menu.map((i, index) => (
            <>
              <li
                key={index}
                className={`text-gray text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-white rounded-md ${i.spacing ? "mt-9" : "mt-2"}`}
              >
                <span className="text-2xl block float-left">
                  <RiDashboardFill />
                </span>
                <span
                  className={`text-base font-medium flex-1 ${!open && "hidden"} `}
                >
                  {i.title}
                </span>
                {i.submenu && open && (
                  <BsChevronDown
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => {
                      setSubMenuOpen(!subMenuOpen);
                    }}
                  ></BsChevronDown>
                )}
              </li>
              {i.submenu && subMenuOpen && open && (
                <ul>
                  {i.submenuItems?.map((subItem, index) => (
                    <li className=" " key={index}>
                      {subItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      <h1>haha</h1>
    </div>
  );
};

export default SideBar;
