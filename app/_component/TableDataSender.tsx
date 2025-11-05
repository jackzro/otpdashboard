"use client";

import React, { useState } from "react";
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
import { Input } from "@nextui-org/input";

export default function TableTemplateDataSender({ data, type, user }: any) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { mutate: postUpdateStatus } = usePostUpdateStatus();
  const [otpCode, setOtpCode] = useState("");

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
        status: "requested",
      },
      {
        onSuccess(data) {
          toast.success("done");
          console.log(data);
        },
        onError(err) {
          console.log(err);
        },
      }
    );
  };
  const onSubmitOtp = async (item: any) => {
    console.log("wqmdkqmwk");
  };

  return (
    <div className="">
      <Table
        className="min-w-[600px]"
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
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.app.name}</TableCell>
              <TableCell>{item.status}</TableCell>

              <TableCell
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                {item.status === "requested" ? (
                  <form className="flex items-center justify-center gap-2">
                    <Input
                      type="text"
                      className=""
                      inputMode="numeric"
                      placeholder={`Enter ${item.app.name} OTP`}
                      value={otpCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) {
                          setOtpCode(val);
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => onSubmitOtp(item)}
                    >
                      Submit OTP
                    </Button>
                  </form>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
