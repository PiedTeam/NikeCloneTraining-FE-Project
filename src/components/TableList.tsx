import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

interface TableListProps {
  list: User[];
  role?: React.Key;
}

const TableList: React.FC<TableListProps> = ({ list, role = "All" }) => {
  const [listUser, setListUser] = React.useState<User[]>([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  React.useEffect(() => {
    const filteredList =
      role === "All" ? list : list.filter((item: User) => item.role === role);
    setListUser(filteredList);
    setPage(1);
  }, [role, list]);

  const pages = Math.ceil(listUser.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return listUser.slice(start, end);
  }, [page, listUser]);

  const getKeyValue = (item: User, key: keyof User) => item[key];

  return (
    <Table
      aria-label="Example table with client side pagination"
      fullWidth
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "100%",
      }}
    >
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="phone">PHONE</TableColumn>
        <TableColumn key="email">MAIL</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
      </TableHeader>
      {listUser.length > 0 ? (
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {getKeyValue(item, columnKey as keyof User)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      )}
    </Table>
  );
};

export default TableList;
