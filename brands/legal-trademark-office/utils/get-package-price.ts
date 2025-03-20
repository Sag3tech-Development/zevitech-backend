import { PackageTypeEnum } from "brands/enums/package-type-enum.js";

export const GetPackagePrice = (packageType: PackageTypeEnum): number => {
  const PACKAGE_PRICES: Record<PackageTypeEnum, number> = {
    [PackageTypeEnum.BASIC]: 49,
    [PackageTypeEnum.STANDARD]: 149,
    [PackageTypeEnum.PREMIUM]: 249,
  };

  if (!Object.values(PackageTypeEnum).includes(packageType)) {
    throw new Error(
      `Invalid package type. Allowed values are: ${Object.values(
        PackageTypeEnum
      ).join(", ")}`
    );
  }

  return PACKAGE_PRICES[packageType] || 0;
};
