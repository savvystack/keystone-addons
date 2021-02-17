import React, { useState } from "react";
import { Button } from "@arch-ui/button";
import Confirm from "@arch-ui/confirm";

// based on answers on
// https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
const saveCsvAsFile = (csv, filename) => {
  const blob = new Blob([csv], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob)
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    window.navigator.msSaveBlob(blob, filename);
  else {
    const url = window.URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    setTimeout(() => {
      a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 500);
  }
};

const encodeCsvValue = (v) => {
  if (typeof v === "undefined" || v === null) return "";
  if (typeof v === "number" || typeof v === "boolean") return v.toString();
  if (v instanceof Date) return v.toISOString();
  v = v.replace(/"/g, '""');
  if (v.search(/("|,|\n)/g) >= 0) return '"' + v + '"';
  else return v;
};

const extractAndDownloadAsCsv = (allItems, selectedItems, columns, filename) => {
  let csv = "";
  const allItemsSelected = allItems.length === selectedItems.length;
  let selectedIdSet;
  if (!allItemsSelected) selectedIdSet = new Set(selectedItems);

  const columnPaths = columns.map((col) => col.path);
  const columnLabels = columns.map((col) => encodeCsvValue(col.label));
  csv += columnLabels.join(",") + "\n";

  allItems.forEach((item) => {
    if (allItemsSelected || selectedIdSet.has(item.id)) {
      const values = columnPaths.map((path) => encodeCsvValue(item[path]));
      csv += values.join(",") + "\n";
    }
  });

  saveCsvAsFile(csv, filename);
};

export default function DownloadManyModal({ isOpen, list, columns, allItems, selectedItems, onClose, onDownload }) {
  // const [deleteItem, { loading }] = useMutation(list.deleteMutation, {
  //   refetchQueries: ["getList"],
  // });

  const [loading, setLoading] = useState(false);

  return (
    <Confirm
      isOpen={isOpen}
      onKeyDown={(e) => {
        if (e.key === "Escape" && !loading) {
          onClose();
        }
      }}
    >
      <p style={{ marginTop: 0 }}>
        Are you sure you want to download <strong>{list.formatCount(selectedItems)}</strong>?
      </p>
      <footer>
        <Button
          variant="ghost"
          onClick={() => {
            if (loading) return;
            extractAndDownloadAsCsv(allItems, selectedItems, columns, `${list.label}.csv`);
            onDownload();
          }}
        >
          Download
        </Button>
        <Button
          variant="subtle"
          onClick={() => {
            if (loading) return;
            onClose();
          }}
        >
          Cancel
        </Button>
      </footer>
    </Confirm>
  );
}
