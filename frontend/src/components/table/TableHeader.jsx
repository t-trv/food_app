const TableHeader = ({ columns }) => {
  return (
    <thead className="bg-gray-100 text-left sticky top-0 z-10">
      <tr>
        {columns.map((column) => (
          <th key={column.key} className="p-3 font-semibold">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
