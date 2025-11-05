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
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

// Define the expected data shape
interface OtpRequest {
  id: number;
  status: string;
  app: { id: number; name: string; code: string };
}

interface PhoneNumberData {
  id: string;
  phone_number: string;
  otpRequests: OtpRequest[];
}

export default function TableTemplateData({ data, type, user }: any) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);

  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const getStatus = (otpRequests: any[], appName: string) => {
    const match = otpRequests.find((r) => r.app.name.toLowerCase() === appName);
    return match ? match.status : "-";
  };

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
          <TableColumn key="phone_number">Phone Number</TableColumn>
          <TableColumn key="instagram">Instagram</TableColumn>
          <TableColumn key="facebook">Facebook</TableColumn>
          <TableColumn key="tiktok">TikTok</TableColumn>
          <TableColumn key="twitter">Twitter</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item): any => (
            //@ts-ignore
            <TableRow key={item.id}>
              <TableCell>
                {
                  //@ts-ignore
                  item.phone_number
                }
              </TableCell>
              <TableCell>
                {
                  //@ts-ignore
                  getStatus(item.otpRequests, "instagram")
                }
              </TableCell>
              <TableCell>
                {
                  //@ts-ignore
                  getStatus(item.otpRequests, "facebook")
                }
              </TableCell>
              <TableCell>
                {
                  //@ts-ignore
                  getStatus(item.otpRequests, "tiktok")
                }
              </TableCell>
              <TableCell>
                {
                  //@ts-ignore
                  getStatus(item.otpRequests, "twitter")
                }
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  size="sm"
                  onClick={
                    //@ts-ignore
                    () => router.push(`/numbers/${item.id}`)
                  }
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
