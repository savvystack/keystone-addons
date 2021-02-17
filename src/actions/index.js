import React from "react";
import { UpdateItems, DeleteItems } from "@keystonejs/app-admin-ui/components";

import DownloadItems from "./DownloadItems";

export default {
  listManageActions: () => {
    return (
      <div>
        <UpdateItems />
        <DeleteItems />
        <DownloadItems />
      </div>
    );
  },
};
