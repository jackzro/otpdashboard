"use client";

import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import MasterTable from "./MasterTable";
import TemplateVoice from "./TemplateVoice";
import TemplateTable from "./TemplateTable";

function MainTable() {
  const { user }: any = useContext(AuthContext);
  console.log(user);
  return (
    <main>
      {user !== null ? (
        user?.type === "admin" ? (
          <MasterTable />
        ) : user?.type === "voiceotp" ? (
          <TemplateVoice id={user.id} />
        ) : (
          <TemplateTable id={user.id} />
        )
      ) : (
        <></>
      )}
    </main>
  );
}

export default MainTable;
