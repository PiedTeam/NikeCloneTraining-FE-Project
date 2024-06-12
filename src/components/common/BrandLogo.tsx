type BrandLogoProps = {
  image_url: string;
  className?: string;
  showNikeLogo?: boolean;
};

const BrandLogo = ({
  image_url,
  className,
  showNikeLogo = false,
}: BrandLogoProps) => {
  return (
    <div className={`mx-10 flex justify-center ${className}`}>
      <img
        src={`${image_url}`}
        alt=""
        className="h-6/12 w-4/12 max-[600px]:hidden "
      />
      {showNikeLogo && (
        <img
          src="../../public/assets/images/nike-4-logo-svgrepo-com.svg"
          alt=""
          className="h-6/12 w-4/12 max-[600px]:hidden"
        />
      )}
    </div>
  );
};

export default BrandLogo;
