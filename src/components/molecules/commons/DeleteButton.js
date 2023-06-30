import {
  confirmationSwal,
  loadingSwal,
  successSwal,
  errorSwal,
  withTokenConfig,
} from "@/helpers";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import { ButtonField } from "@/components/atoms";

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
    <div className="bg-atlasian-red hover:bg-red-700 focus:bg-red-700 rounded-lg h-10 items-center flex font-medium">
      <ButtonField
        icon={<TrashIcon primaryColor="#fff" />}
        text="Delete"
        handler={() => handleClick(url)}
      />
    </div>
  );
};

export default DeleteButton;
