import React, { Fragment, useState } from "react";

import { DownloadIcon } from "@primer/octicons-react";
import { IconButton } from "@arch-ui/button";

import DownloadItemsModal from "./DownloadItemsModal";
import { useList } from "@keystonejs/app-admin-ui/client/providers/List";
import { useListColumns } from "@keystonejs/app-admin-ui/client/pages/List/dataHooks";

const DownloadItems = () => {
  const [downloadModalIsVisible, setDownloadModal] = useState(false);
  const {
    list,
    listData: { items },
    selectedItems,
    setSelectedItems,
  } = useList();

  const [columns, handleColumnChange] = useListColumns();

  const onClose = () => {
    setDownloadModal(false);
  };

  const onDownload = () => {
    setDownloadModal(false);
    setSelectedItems([]);
  };

  console.log(selectedItems);
  console.log(columns);

  return (
    <Fragment>
      <IconButton appearance="default" icon={DownloadIcon} onClick={() => setDownloadModal(true)} variant="nuance" id="list-page-csv-download-button">
        Download
      </IconButton>
      <DownloadItemsModal isOpen={downloadModalIsVisible} list={list} allItems={items} selectedItems={selectedItems} onClose={onClose} onDownload={onDownload} />
    </Fragment>
  );
};

export default DownloadItems;
