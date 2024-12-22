import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Briefcase, User, Video } from "lucide-react";

const NavbarLinksComponent = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-4">
        <Link href="/jobs">
          <Button variant="ghost">
            <Briefcase className="mr-2 h-4 w-4" />
            Jobs
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="ghost">
            <User className="mr-2 h-4 w-4" />
            Services
          </Button>
        </Link>
        <Link href="/meetings">
          <Button variant="ghost">
            <Video className="mr-2 h-4 w-4" />
            Meetings
          </Button>
        </Link>
      </nav>
    </>
  );
};

export default NavbarLinksComponent;
