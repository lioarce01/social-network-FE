import Link from "next/link";
import DropdownMenuComponent from "./dropdownMenu";
import NavbarLinksComponent from "./navbarLinks";
import NavbarSearchbarComponent from "./navbarSearchbar";
import NavbarNotificationsComponent from "./navbarNotifications";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          TechConnect
        </Link>
        <div className="flex items-center space-x-4">
          {/* <NavbarSearchbarComponent /> */}
          <NavbarLinksComponent />
          <NavbarNotificationsComponent />
          <DropdownMenuComponent />
        </div>
      </div>
    </header>
  );
}
