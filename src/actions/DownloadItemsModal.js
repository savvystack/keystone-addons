import React, { useState } from "react";
import { Button } from "@arch-ui/button";
import Confirm from "@arch-ui/confirm";

export default function DownloadManyModal({ isOpen, list, allItems, selectedItems, onClose, onDownload }) {
  // const [deleteItem, { loading }] = useMutation(list.deleteMutation, {
  //   refetchQueries: ["getList"],
  // });

  const [loading, setLoading] = useState(false);
  console.log(list);
  console.log(allItems);

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
          onClick={async () => {
            if (loading) return;
            // await deleteItem({ variables: { id: item.id } });
            console.log("download all");
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
