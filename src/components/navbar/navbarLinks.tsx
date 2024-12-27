import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Briefcase, User, Video } from "lucide-react";

const NavbarLinksComponent = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-4">
        <Link href="/jobpostings">
          <Button variant="ghost">
            <div className="flex flex-col items-center">
              <Briefcase className="h-4 w-4" />
              <p>Jobs</p>
            </div>
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="ghost">
            <div className="flex flex-col items-center">
              <User className="h-4 w-4" />
              <p>Services</p>
            </div>
          </Button>
        </Link>
        <Link href="/meetings">
          <Button variant="ghost">
            <div className="flex flex-col items-center">
              <Video className="h-4 w-4" />
              <p>Meetings</p>
            </div>
          </Button>
        </Link>
      </nav>
    </>
  );
};

export default NavbarLinksComponent;
