import GovernmentUtilityBar from "./GovernmentUtilityBar";
import MainNavigation from "./MainNavigation";

export default function SANKALPHeader() {
  return (
    <div className="sticky top-0 z-50 w-full">
      <GovernmentUtilityBar />
      <MainNavigation />
    </div>
  );
}
