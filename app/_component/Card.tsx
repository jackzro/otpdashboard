import { usePostUpdateSenderOtp } from "@/services/numbers";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";

function CardComponent(item: any) {
  const utcDate = new Date(item.data.requestedAt);
  const [otpCode, setOtpCode] = useState("");
  const { mutate: updateSenderOtp } = usePostUpdateSenderOtp();
  const onSubmitOtp = async (item: any) => {
    updateSenderOtp(
      {
        id: item.data.id,
        otpcode: otpCode,
      },
      {
        onSuccess(data) {
          toast.success(`Your OTP for ${item.data.app.name} is updated`, {
            position: "top-right",
          });
          console.log("data", data);
        },
        onError(err) {
          console.log("err", err);
        },
      }
    );
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <h1>{item.data.app.name}</h1>

            <h1>Otp : {item.data.otpCode}</h1>
          </div>
          <div>
            <h1>{item.data.status}</h1>
            <h1>
              {utcDate.toLocaleString("en-ID", { timeZone: "Asia/Jakarta" })}
            </h1>
          </div>
        </CardHeader>
        <CardBody>
          <form className="flex items-center justify-center gap-2">
            <Input
              type="text"
              className=""
              inputMode="numeric"
              placeholder={`Enter ${item.data.app.name} OTP`}
              value={otpCode}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setOtpCode(val);
                }
              }}
            />
            <Button size="sm" color="primary" onClick={() => onSubmitOtp(item)}>
              Submit OTP
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default CardComponent;
