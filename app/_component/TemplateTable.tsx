"use client";

import { usePostReport, usePostSent } from "@/services/sent";
import React from "react";
import TableTemplateData from "./TableData";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { toast } from "sonner";
import { useUserBalance } from "../../services/usersms";
//@ts-ignore

function TemplateTable() {
  const today = new Date().toISOString().split("T")[0];
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  const futureDate = endDate.toISOString().split("T")[0];
  const [value, setValue] = React.useState({
    start: parseDate(today),
    end: parseDate(futureDate),
  });
  const [res, setRes] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const { data: balance, isLoading: loadingBalance } = useUserBalance();
  const { mutate: postSent } = usePostSent();
  const { mutate: postReport } = usePostReport();
  const handleData = async (date: any) => {
    setTotal(0);
    setValue({
      //@ts-ignore
      start: date?.start,
      //@ts-ignore
      end: date?.end,
    });
    postSent(
      {
        //@ts-ignore
        start: date?.start,
        //@ts-ignore
        end: date?.end,
      },
      {
        onSuccess(data) {
          setRes(data);
          data.map((item: any) =>
            setTotal((prev: any) => prev + Number(item.row_count))
          );
          toast.success("Successfully !!!");
        },
        onError(err) {
          //   console.log(err);
        },
      }
    );

    postReport(
      {
        //@ts-ignore
        start: date?.start,
        //@ts-ignore
        end: date?.end,
      },
      {
        onSuccess(data) {
          setStatus(data);
          toast.success("Successfully !!!");
        },
        onError(err) {
          //   console.log(err);
        },
      }
    );
  };

  return (
    <>
      {loadingBalance === false && balance.length !== 0 && (
        <div className="w-full">
          <div className="flex items-center justify-center w-full pb-10">
            <DateRangePicker
              className="max-w-xs"
              label="Pick a date"
              value={value}
              onChange={(date) => handleData(date)}
            />
          </div>

          <div className="grid max-w-full grid-rows-1 px-10 pb-10 text-2xl lg:grid-cols-4 sm:grid-cols-2">
            <div>
              Balance :
              {loadingBalance === false &&
              //@ts-ignore
              balance !== undefined ? (
                balance[0].balance === null ? (
                  ` 0`
                ) : (
                  `${balance[0].balance}`
                )
              ) : (
                <></>
              )}
            </div>

            <p>
              DELIV :{" "}
              {
                //@ts-ignore
                status["DELIVRD"] ? status["DELIVRD"] : 0
              }
            </p>
            <p>
              UNDELIV :{" "}
              {
                //@ts-ignore
                status["UNDELIV"] ? status["UNDELIV"] : 0
              }
            </p>
            <div>Total : {total}</div>
          </div>
          {res.length !== 0 ? (
            <TableTemplateData data={res} />
          ) : (
            <div className="flex items-center justify-center w-full">
              No Data
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default TemplateTable;
