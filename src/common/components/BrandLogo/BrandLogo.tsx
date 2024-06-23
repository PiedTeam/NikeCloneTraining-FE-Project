import { SvgIcon } from "@common/components";

type BrandLogoProps = {
  className?: string;
  isShowNikeLogo?: boolean;
};

const BrandLogo = ({ className, isShowNikeLogo = false }: BrandLogoProps) => {
  return (
    <div className={`mx-10 flex justify-center ${className}`}>
      <SvgIcon icon="jordan" />
      {isShowNikeLogo && (
        <div className="h-6/12 my-auto w-4/12 max-[600px]:hidden">
          <SvgIcon icon="nike" />
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
