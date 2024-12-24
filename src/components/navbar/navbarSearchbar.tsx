import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const NavbarSearchbarComponent = () => {
  return (
    <>
      <div className="relative hidden md:block">
        <Input type="search" placeholder="Search..." className="w-64 pl-10" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </>
  );
};

export default NavbarSearchbarComponent;
