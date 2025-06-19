"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import Dropdown from "./Dropdown";
import { useUser } from "@/services/sent";
import TemplateVoice from "./TemplateVoice";
import TemplateTable from "./TemplateTable";

function MasterTable() {
  const { user }: any = useContext(AuthContext);
  const { data: customer } = useUser();
  const [type, setType] = useState("");
  const [id, setId] = useState("");

  const handleSelect = (value: any) => {
    setType(value.api_type);
    setId(value.id);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-2 space-x-4">
      {customer !== undefined && (
        <Dropdown
          label="Select user"
          options={customer}
          onSelect={handleSelect}
        />
      )}

      {type !== "" ? (
        type === "voiceotp" ? (
          <TemplateVoice id={id} />
        ) : (
          <TemplateTable id={id} />
        )
      ) : null}
    </main>
  );
}

export default MasterTable;
