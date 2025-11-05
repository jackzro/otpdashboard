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
import { usePostUpdateStatus } from "@/services/numbers";
import { toast } from "sonner";

export default function TableTemplateDataDetail({ data, type, user }: any) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { mutate: postUpdateStatus } = usePostUpdateStatus();

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

  const handleRequestOtp = async (appName: any) => {
    postUpdateStatus(
      {
        id: appName.id,
        status: appName.status,
      },
      {
        onSuccess(data) {
          toast.success(`OTP is ${appName.status}`, {
            position: "top-right",
          });
          console.log(data);
        },
        onError(err) {
          console.log(err);
        },
      }
    );
  };

  return (
    <div className="w-[700px]">
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
          <TableColumn>App</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Otp Code</TableColumn>
          <TableColumn>Otp Input Time</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: any) => {
            const utcDate = new Date(item.filledAt);
            return (
              <TableRow key={item.id}>
                <TableCell>{item.app.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.otpCode}</TableCell>
                <TableCell>
                  {utcDate.toLocaleString("en-ID", {
                    timeZone: "Asia/Jakarta",
                  })}
                </TableCell>
                <TableCell className="flex justify-between">
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() =>
                      handleRequestOtp({ id: item.id, status: "requested" })
                    }
                  >
                    Request Again
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() =>
                      handleRequestOtp({ id: item.id, status: "verified" })
                    }
                  >
                    Done
                  </Button>
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
}
