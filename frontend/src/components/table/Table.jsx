import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import EmptyState from "../EmptyState";
import TablePagination from "./TablePagination";

const Table = ({ columns, data, page, totalPages, setPage, onSort, sortColumn, sortDirection, search, setSearch }) => {
  if (!data || data.length === 0) return <EmptyState title="Không có dữ liệu" />;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm w-full">
        <div className="max-h-135 h-fit overflow-y-auto custom-scrollbar">
          <table className="w-full border-collapse">
            {/* Header */}
            <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} sortDirection={sortDirection} />

            {/* Body */}
            <TableBody columns={columns} data={data} />
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <TablePagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default Table;
