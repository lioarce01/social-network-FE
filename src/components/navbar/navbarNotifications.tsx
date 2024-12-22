import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const NavbarNotificationsComponent = () => {
  return (
    <>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
    </>
  );
};

export default NavbarNotificationsComponent;
