"use client";

import { usePostReport, usePostSent } from "@/services/sent";
import React from "react";
import TableTemplateData from "./TableData";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { toast } from "sonner";
import { useUserBalance } from "../../services/usersms";
//@ts-ignore

function TemplateTable({ id }: any) {
  const today = new Date();
  // Get the first day of the month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  // Get the last day of the month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Format as YYYY-MM-DD if you want to display it
  const formatDate = (date: any) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [value, setValue] = React.useState({
    start: parseDate(formatDate(startOfMonth)),
    end: parseDate(formatDate(endOfMonth)),
  });

  const [res, setRes] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const [total, setTotal] = React.useState(0);

  const [userId, setUserId] = React.useState(0);
  const { data: balance, isLoading: loadingBalance } = useUserBalance();
  const { mutate: postSent } = usePostSent();
  const { mutate: postReport } = usePostReport();

  React.useEffect(() => {
    postSent(
      {
        //@ts-ignore
        start: value?.start,
        //@ts-ignore
        end: value?.end,
        id: id,
      },
      {
        onSuccess(data) {
          setUserId(id);
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
        start: value?.start,
        //@ts-ignore
        end: value?.end,
        id: userId,
      },
      {
        onSuccess(data) {
          console.log("data", data);
          setStatus(data);
          toast.success("Successfully !!!");
        },
        onError(err) {
          //   console.log(err);
        },
      }
    );
  }, []);

  const handleData = async (date: any) => {
    setRes([]);
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
        id: userId,
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
        id: id,
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

          <div className="grid max-w-full grid-rows-1 gap-4 px-10 pb-10 text-2xl lg:grid-cols-4 sm:grid-cols-2">
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
                status["DELIVRD"]
                  ? //@ts-ignore
                    status["DELIVRD"]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : 0
              }
            </p>
            <p>
              UNDELIV :{" "}
              {
                //@ts-ignore
                status["UNDELIV"]
                  ? //@ts-ignore
                    status["UNDELIV"]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : 0
              }
            </p>
            <div>
              Total : {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
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
