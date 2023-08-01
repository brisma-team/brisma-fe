import { IconClose } from "@/components/icons";
import Textfield from "@atlaskit/textfield";
import { Card } from "@/components/atoms";

const CardFilterTimAudit = ({ showFilter }) => {
  return (
    showFilter && (
      <Card>
        <div className="flex flex-wrap m-2 gap-3 px-2">
          <div className="w-48">
            <Textfield
              placeholder="Nama Tim"
              elemAfterInput={
                <button className="justify-center">
                  <IconClose size="large" />
                </button>
              }
            />
          </div>
          <div className="w-48">
            <Textfield
              placeholder="Manajer Audit"
              elemAfterInput={
                <button className="justify-center">
                  <IconClose size="large" />
                </button>
              }
            />
          </div>
          <div className="w-48">
            <Textfield
              placeholder="Ketua Tim Audit"
              elemAfterInput={
                <button className="justify-center">
                  <IconClose size="large" />
                </button>
              }
            />
          </div>
          <div className="w-48">
            <Textfield
              placeholder="Anggota Tim Audit"
              elemAfterInput={
                <button className="justify-center">
                  <IconClose size="large" />
                </button>
              }
            />
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterTimAudit;
