"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

export default function TableTemplateData({ data, type, user }: any) {
  const [page, setPage] = React.useState(1);

  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <div className="">
      <Table
        className=""
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex justify-center w-full">
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
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="row_count">Total</TableColumn>
          {type === "voiceotp" ? (
            <>
              {user.username === "admin" && (
                <TableColumn key="detik">Detik</TableColumn>
              )}

              <TableColumn key="success_count">Success</TableColumn>
            </>
          ) : (
            <></>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item): any => (
            //@ts-ignore
            <TableRow key={item?.date}>
              {(columnKey) => {
                //@ts-ignore
                const dateTimeString = item.date;
                const dateObj = new Date(dateTimeString);
                dateObj.setDate(dateObj.getDate());
                const formattedDate = dateObj.toISOString().split("T")[0];
                //@ts-ignore
                if (columnKey === "date") {
                  return <TableCell>{formattedDate}</TableCell>;
                }
                return (
                  <TableCell>
                    {getKeyValue(item, columnKey)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
