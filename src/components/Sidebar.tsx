import { useEffect, useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { IoLogOutOutline, IoMenuOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [open, setOpen] = useState(true);

  type MenuItem = {
    title: string;
    icon: JSX.Element;
    spacing?: boolean;
    submenu?: boolean;
    submenuItems?: { title: string; link?: string }[];
    link?: string;
  };

  const Menus: MenuItem[] = [
    { title: "Dashboard", icon: <MdSpaceDashboard />, link: "/" },
    { title: "Transaction", icon: <GoChecklist />, link: "/transaction" },
    { title: "Report", icon: <TbReportAnalytics />, link: "/report" },
    {
      title: "Setting",
      spacing: true,
      icon: <VscSettings />,
      link: "/setting",
    },
    /* { */
    /*   title: "Projects", */
    /*   submenu: true, */
    /*   icon: <AiOutlineProfile />, */
    /*   submenuItems: [ */
    /*     { title: "Submenu 1" }, */
    /*     { title: "Submenu 2" }, */
    /*     { title: "Submenu 3" }, */
    /*   ], */
    /* }, */
    { title: "Profile", icon: <AiOutlineProfile />, link: "/profile" },
  ];

  const currentPath = useLocation().pathname;

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`h-[90vh] absolute md:relative bg-athensgray-50 ${open ? "w-[100%] md:w-[270px]" : "left-[-100px] md:left-0 w-0 md:w-[105px]"} p-8 duration-500 md:duration-300`}
    >
      <ul className="pt-2">
        {Menus.map((menu, index) => {
          return (
            <NavLink key={index} to={menu.link ? menu.link : "#"}>
              <li
                className={`text-sm flex items-center gap-x-4 ${currentPath === menu?.link ? "bg-cerulean text-white" : "text-abbey"} p-2 rounded-md hover:bg-cerulean hover:text-white ${menu?.spacing ? "mt-9" : "my-4"}`}
                onClick={() =>
                  menu?.submenu && open && setSubmenuOpen(!submenuOpen)
                }
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <MdSpaceDashboard />}
                </span>
                <span
                  className={`text-base duration-500 font-medium flex-1 ${!open && "hidden"}`}
                >
                  {menu.title}
                </span>

                {menu?.submenu && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"} duration-500`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </li>

              {menu.submenu && menu.submenuItems && submenuOpen && open && (
                <ul className={`${submenuOpen && open ? "show" : "hidden"}`}>
                  {menu?.submenuItems.map((submenuItem, index) => (
                    <NavLink to={submenuItem?.link ? submenuItem.link : "#"}>
                      <li
                        className={`text-abbey text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 rounded-md hover:bg-cerulean hover:text-white`}
                        key={index}
                      >
                        {submenuItem.title}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              )}
            </NavLink>
          );
        })}

        <li className="text-white text-sm flex items-center bg-pinkflare-700 mt-[100px] gap-x-4 cursor-pointer p-2 rounded-md hover:bg-pinkflare-600 hover:text-white bottom-12">
          <span className="text-2xl block float-left">
            <IoLogOutOutline />
          </span>
          <span
            className={`text-base duration-500 font-medium flex-1 ${!open && "hidden"}`}
          >
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
