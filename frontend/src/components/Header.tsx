
import React from "react";
import SearchBar from "./Searchbar";
import FilterBar from "./FilterBar";

interface HeaderProps {
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isEditDeleteDisabled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  selectedContactId: number | null;
  filterOptions: string[];
}

const Header: React.FC<HeaderProps> = ({
  onAdd,
  onEdit,
  onDelete,
  isEditDeleteDisabled,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  selectedContactId,
  filterOptions,
}) => {
  return (
    <header className="bg-white p-2 shadow-md mt-8">
      <div className="mx-2 flex flex-row items-center gap-4 flex-wrap">
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
         + New
        </button>

        <button
          onClick={() => selectedContactId !== null && onEdit(selectedContactId)}
          disabled={isEditDeleteDisabled}
          className={`px-4 py-2 rounded ${
            isEditDeleteDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Edit
        </button>

        <button
          onClick={() => selectedContactId !== null && onDelete(selectedContactId)}
          disabled={isEditDeleteDisabled}
          className={`px-4 py-2 rounded ${
            isEditDeleteDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Delete
        </button>

       <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
       />

        <FilterBar
        filterType={filterType}
        setFilterType={setFilterType}
        filterOptions={filterOptions}
        />
      </div>
    </header>
  );
};

export default Header;