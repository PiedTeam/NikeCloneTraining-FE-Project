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
  // // TEST FIX CỨNG DATA
  // props = {
  //   featureArray: [
  //     { featureName: "Find a Store", route: "/retail" },
  //     { featureName: "Help", route: "/help" },
  //     { featureName: "Join Us", route: "/membership" },
  //     { featureName: "Sign In", route: "/signin", separator: false },
  //   ],
  // };

  return (
    <div className="bg-[#f5f5f5] w-full h-10 flex flex-row">
      {/* LEFT SIDE */}
      <div className="basis-1/2 w-full">
        <div className="inline-block items-start h-full">
          <SiJordan className="text-4xl" />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="basis-1/2 w-full">
        <ul className="flex flex-row justify-end h-full w-full">
          {props.featureArray.map((feature, index) => (
            <li key={index} className="flex flex-row items-center h-full">
              <a href={feature.route} className="text-[#121212] font-medium">
                {feature.featureName}
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
