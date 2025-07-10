"use client";

import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import MasterTable from "./MasterTable";
import TemplateVoice from "./TemplateVoice";
import TemplateTable from "./TemplateTable";
import { Button } from "@nextui-org/button";
import Link from "next/link";

function MainTable() {
  const { user }: any = useContext(AuthContext);

  return (
    <>
      {user !== null && (
        <main>
          {user.username === "admin" && (
            <Link href="/voiceotp">
              <Button>Voice OTP</Button>
            </Link>
          )}

          {user !== null ? (
            user?.type === "admin" ? (
              <MasterTable />
            ) : user?.type === "voiceotp" ? (
              <TemplateVoice id={user.id} user={user} />
            ) : (
              <TemplateTable id={user.id} user={user} />
            )
          ) : (
            <></>
          )}
        </main>
      )}
    </>
  );
}

export default MainTable;
