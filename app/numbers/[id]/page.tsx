"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetNumberByid } from "@/services/numbers";
import TableTemplateDataDetail from "@/app/_component/TableDataDetail";
import TableTemplateDataSender from "@/app/_component/TableDataSender";
import CardComponent from "@/app/_component/Card";
import { AuthContext } from "@/app/_component/Auth/AuthProvider";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function NumberSatuanPage() {
  const { user }: any = useContext(AuthContext);
  const router = useRouter();
  const { id } = useParams();
  const { data: number, isLoading } = useGetNumberByid(id);
  // console.log("num", user);
  if (isLoading || !user || !user.role) return <div>Loading...</div>;
  return (
    <>
      <div className="min-w-[700px]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">
            Phone Number: {number[0].number.phone_number}
          </h2>
          <Button onClick={() => router.back()}>Back</Button>
        </div>

        {user.role === "sender" ? (
          number.map((item: any) => <CardComponent key={item.id} data={item} />)
        ) : (
          <TableTemplateDataDetail data={number} />
        )}
      </div>
    </>
  );
}
