import React from "react";
import confirmationSwal from "@/helpers/confirmationSwal";
import loadingSwal from "@/helpers/loadingSwal";
import successSwal from "@/helpers/successSwal";
import errorSwal from "@/helpers/errorSwal";
import withTokenConfig from "@/helpers/withTokenConfig";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import Button from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";

import axios from "axios";

const DeleteButton = ({ url, mutate }) => {
  async function handleClick(url) {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();

    try {
      const result = await axios.delete(url, withTokenConfig());

      loadingSwal("close");

      await successSwal(result.data.message);

      mutate();
    } catch (error) {
      loadingSwal("close");

      errorSwal(error);
    }
  }

  return (
    <Tooltip content="Delete">
      <Button
        iconBefore={<TrashIcon />}
        appearance="danger"
        onClick={() => handleClick(url)}
      />
    </Tooltip>
  );
};

export default DeleteButton;
