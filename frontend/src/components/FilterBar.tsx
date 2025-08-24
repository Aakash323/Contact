import React from "react";

interface FilterBarProps {
  filterType: string;
  setFilterType: (type: string) => void;
  filterOptions: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  setFilterType,
  filterOptions,
}) => {
  return (
    <div className="mr-2 min-w-[150px]">
      <label htmlFor="property-type-filter" className="sr-only">
        Filter by Property Type
      </label>
      <select
        id="property-type-filter"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">All</option>
        {filterOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
