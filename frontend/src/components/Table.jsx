const Table = ({ columns, data }) => {
  if (!data || data.length === 0)
    return <div className="text-center">Không có dữ liệu</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm w-full">
      <div className="max-h-100 overflow-y-auto custom-scrollbar">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 text-left sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="p-3 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-300">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="p-3">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
