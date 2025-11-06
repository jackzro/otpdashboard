"use client";

import { usePostNumbers } from "@/services/numbers";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function CreateNumber() {
  const [num, setNum] = useState("");
  const { mutate: postNUmber } = usePostNumbers();
  const queryClient = useQueryClient();
  const inputNewNum = async (e: any) => {
    e?.preventDefault?.();
    if (!num) return;
    postNUmber(
      {
        number: num,
      },
      {
        onSuccess(data) {
          toast.success(`Your number is created`, {
            position: "top-right",
          });
          console.log("data", data);
          // refresh the numbers list
          queryClient.invalidateQueries({ queryKey: ["numbers"] });
          setNum("");
        },
        onError(err) {
          console.log("err", err);
        },
      }
    );
  };
  return (
    <form
      className="flex flex-row justify-between gap-3"
      onSubmit={inputNewNum}
    >
      <Input
        type="text"
        className="w-full"
        inputMode="numeric"
        placeholder={`Enter Number`}
        value={num}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*$/.test(val)) {
            setNum(val);
          }
        }}
      />
      <Button className="w-full" type="submit" onClick={inputNewNum}>
        Input New Number
      </Button>
    </form>
  );
}

export default CreateNumber;
