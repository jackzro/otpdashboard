"use client";

import { useGetNumber } from "@/services/numbers";
import React from "react";
import TableTemplateData from "./TableData";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { toast } from "sonner";
import { useUserBalance } from "../../services/usersms";
import { number } from "zod";
//@ts-ignore

function NumberTable({ id }: any) {
  const { data: numbers } = useGetNumber();
  console.log(numbers);

  const [res, setRes] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const [total, setTotal] = React.useState(0);

  const [userId, setUserId] = React.useState(0);

  const handleData = async (date: any) => {
    // setRes([]);
    // setTotal(0);
    // setValue({
    //   //@ts-ignore
    //   start: date?.start,
    //   //@ts-ignore
    //   end: date?.end,
    // });
    // postSent(
    //   {
    //     //@ts-ignore
    //     start: date?.start,
    //     //@ts-ignore
    //     end: date?.end,
    //     id: userId,
    //   },
    //   {
    //     onSuccess(data) {
    //       setRes(data);
    //       data.map((item: any) =>
    //         setTotal((prev: any) => prev + Number(item.row_count))
    //       );
    //       toast.success("Successfully !!!");
    //     },
    //     onError(err) {
    //       //   console.log(err);
    //     },
    //   }
    // );
  };

  return (
    <>
      {numbers !== undefined ? (
        <TableTemplateData data={numbers} />
      ) : (
        <div className="flex items-center justify-center w-full">No Data</div>
      )}
    </>
  );
}

export default NumberTable;
