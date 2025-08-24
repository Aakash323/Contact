import React from "react";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

}

const SearchBar: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
    
      <div className="ml-190 min-w-[150px]">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-48"
        />
      </div>

    </>
  );
};

export default SearchBar;
