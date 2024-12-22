"use client";
import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Image } from "lucide-react";

const WritePostComponent = () => {
  return (
    <>
      <Card className="bg-white mb-10">
        <CardHeader>
          <Input
            placeholder="Share your thoughts, ideas, or work..."
            className="bg-white"
          />
        </CardHeader>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="ghost">
            <Image className="mr-2 h-4 w-4" />
            Photo
          </Button>

          <Button variant="ghost">Write Article</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default WritePostComponent;
