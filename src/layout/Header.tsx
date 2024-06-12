import { SiJordan } from "react-icons/si";

interface featureInHeader {
  featureName: string;
  route: string;
  separator?: boolean; // NẾU NHƯ BẠN THÊM FALSE THÌ KHÔNG CÓ SEPARATOR
}

interface HeaderProps {
  featureArray: featureInHeader[];
}

const Header = (props: HeaderProps) => {
  const user = localStorage.getItem("user");
  return (
    <div className="bg-[#f5f5f5] w-full h-8 m-0 flex py-5 px-16 flex-row">
      {/* LEFT SIDE */}
      <div className="basis-1/2 w-full flex h-full items-center">
        <div className="inline-block items-start py-1">
          <SiJordan className="text-2xl" />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="basis-1/2 w-full">
        <ul className="flex flex-row justify-end h-full w-full">
          {props.featureArray.map((feature, index) => (
            <li key={index} className="flex flex-row items-center h-full">
              <a href={feature.route} className="text-[#121212] font-medium text-sm hover:text-[#12121285]">
                {feature.featureName === "Sign in" && user ? "Sign out" : feature.featureName}
              </a>
              {feature.separator !== false && <div className={`inline-block border-r-1 border-r-black h-4 mx-2`}></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Header;
