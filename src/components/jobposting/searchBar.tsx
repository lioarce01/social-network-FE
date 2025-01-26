import { Mode } from "@/types/Job";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface SearchBarComponentProps {
  onSearch: (searchTerm: string, mode?: Mode) => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState<Mode | "all">("all");

  const handleSearch = () => {
    onSearch(searchTerm, mode === "all" ? undefined : mode);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
      <Input
        placeholder="Job title, keywords"
        className="flex-grow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <Select value={mode} onValueChange={(value) => setMode(value as Mode)}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Work mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value={Mode.REMOTE}>Remote</SelectItem>
          <SelectItem value={Mode.HYBRID}>Hybrid</SelectItem>
          <SelectItem value={Mode.ONSITE}>On-site</SelectItem>
        </SelectContent>
      </Select>

      <Button className="w-full md:w-auto" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBarComponent;
