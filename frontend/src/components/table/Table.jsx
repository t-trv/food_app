import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import EmptyState from "../EmptyState";
import TablePagination from "./TablePagination";

const Table = ({ columns, data }) => {
  if (!data || data.length === 0) return <EmptyState title="Không có dữ liệu" />;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm w-full">
        <div className="max-h-100 overflow-y-auto custom-scrollbar">
          <table className="w-full border-collapse">
            {/* Header */}
            <TableHeader columns={columns} />

            {/* Body */}
            <TableBody columns={columns} data={data} />
          </table>
        </div>
      </div>
      {/* Pagination */}
      <TablePagination data={data} />
    </div>
  );
};

export default Table;
