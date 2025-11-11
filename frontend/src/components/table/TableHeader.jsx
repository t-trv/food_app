import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const TableHeader = ({ columns, onSort, sortColumn, sortDirection }) => {
  return (
    <thead className="bg-gray-100 text-left sticky top-0 z-10">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`p-3 font-semibold select-none ${
              column.sortable ? "cursor-pointer hover:text-primary transition-all duration-300" : ""
            }`}
            onClick={() => {
              if (column.sortable) {
                onSort(column.key);
              }
            }}
          >
            <div className="flex items-center gap-1">
              {column.label}
              {sortColumn === column.key ? (
                sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )
              ) : null}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
