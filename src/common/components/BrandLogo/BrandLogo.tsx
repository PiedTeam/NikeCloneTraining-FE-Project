import { SvgIcon } from "@common/components";

type BrandLogoProps = {
  className?: string;
  isShowNikeLogo?: boolean;
};

const BrandLogo = ({ className, isShowNikeLogo = false }: BrandLogoProps) => {
  return (
    <div className={`mx-10 flex justify-center ${className}`}>
      <div>
        <SvgIcon icon="jordan" />
      </div>

      {isShowNikeLogo && (
        <div>
          <SvgIcon icon="nike" />
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
