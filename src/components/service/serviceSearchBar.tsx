import React from 'react'
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchBarComponentProps {
  onSearch: (searchTerm: string) => void;
}

const ServiceSearchBar = ({onSearch}: SearchBarComponentProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
      <Input
        placeholder="Service title, keywords"
        className="flex-grow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <Button className="w-full md:w-auto" onClick={handleSearch}>
        Search
      </Button>
    </div>
  )
}

export default ServiceSearchBar