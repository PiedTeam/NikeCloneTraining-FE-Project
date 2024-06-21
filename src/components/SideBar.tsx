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
        className={`h-screen bg-zinc-200 p-5 pt-8 ${open ? "w-72" : "w-20"} relative duration-300`}
      >
        <BsArrowLeftShort
          className={`text-dark-purple border-dark-purple absolute -right-8 top-9 cursor-pointer rounded-full border bg-white text-5xl ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <BiSolidUser
            className={`float-left mr-2 block cursor-pointer rounded text-4xl duration-500 ${open && "rotate-[360deg]"}`}
          ></BiSolidUser>
          <h1
            className={`origin-left text-2xl font-medium text-white duration-500 ${!open && "scale-0"}`}
          >
            haha
          </h1>
        </div>
        <ul className="pt-2">
          {Menu.map((i, index) => (
            <>
              <li
                key={index}
                className={`text-gray flex cursor-pointer items-center gap-x-4 rounded-md p-2 px-5 text-sm hover:bg-white ${i.spacing ? "mt-9" : "mt-2"}`}
              >
                <span className="float-left block text-2xl">
                  <RiDashboardFill />
                </span>
                <span
                  className={`flex-1 text-base font-medium ${!open && "hidden"} `}
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
