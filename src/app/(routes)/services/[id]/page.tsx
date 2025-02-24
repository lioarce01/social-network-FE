import ServiceDetailComponent from "@/components/service/serviceDetail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function ServiceDetail() {

    return (
        <div className="w-full p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/services">← Back to Services</Link>
        </Button>

        <div className="w-full flex justify-center">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
            <ServiceDetailComponent/>
          </div>
        </div>
      </div>
    </div>
    );
}