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
  return (
    <div className="m-0 flex h-8 w-full flex-row bg-[#f5f5f5] px-16 py-5">
      {/* LEFT SIDE */}
      <div className="flex h-full w-full basis-1/2 items-center">
        <div className="inline-block items-start py-1">
          <SiJordan className="text-2xl" />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="w-full basis-1/2">
        <ul className="flex h-full w-full flex-row justify-end">
          {props.featureArray.map((feature, index) => (
            <li key={index} className="flex h-full flex-row items-center">
              <a
                href={feature.route}
                className="text-sm font-medium text-[#121212] hover:text-[#12121285]"
              >
                {feature.featureName}
              </a>
              {feature.separator !== false && (
                <div
                  className={`mx-2 inline-block h-4 border-r-1 border-r-black`}
                ></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Header;
