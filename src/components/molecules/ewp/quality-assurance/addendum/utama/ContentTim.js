import { ButtonField, Card, ErrorValidation } from "@/components/atoms";
import {
  CardTeam,
  CardMemberTeam,
} from "../../../konsulting/perencanaan/tim-timeplan";

const ContentTim = ({
  data,
  validation,
  isDisabled,
  handleAddObject,
  handleDeleteObject,
  handleChangeSelect,
  handleChangeText,
  handleSubmit,
}) => {
  return (
    <>
      <Card>
        <div className="p-5 grid grid-cols-3 gap-3 w-full h-full">
          <CardTeam
            data={data}
            validation={validation}
            property={"initiator"}
            title={"Initiator"}
            textColorTitle={"text-atlasian-yellow"}
            withoutButton
            isDisabled
          />
          <CardTeam
            isUserSKAI
            data={data}
            validation={validation}
            withoutButton={isDisabled}
            isDisabled={isDisabled}
            property={"ma"}
            title={"Manajer Review"}
            textColorTitle={"text-atlasian-blue-light"}
            handleAdd={handleAddObject}
            handleDelete={handleDeleteObject}
            handleChangeSelect={handleChangeSelect}
          />
          <CardTeam
            isUserSKAI
            data={data}
            validation={validation}
            withoutButton={isDisabled}
            isDisabled={isDisabled}
            property={"kta"}
            title={"Ketua Tim Review"}
            textColorTitle={"text-atlasian-red"}
            handleAdd={handleAddObject}
            handleDelete={handleDeleteObject}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="p-5 w-full">
          <Card>
            <div className="px-4 py-2 flex flex-col gap-4 w-full">
              {!isDisabled ? (
                <div className="bg-atlasian-purple rounded w-fit">
                  <ButtonField
                    text={"Tambah Anggota Tim"}
                    handler={() => handleAddObject("ata")}
                  />
                </div>
              ) : (
                ""
              )}
              {validation["ata"] ? (
                <ErrorValidation
                  className={"mt-3"}
                  message={validation["ata"]}
                />
              ) : (
                ""
              )}
              <CardMemberTeam
                title={"Anggota Tim Audit"}
                textColorTitle={"text-atlasian-green"}
                property={"ata"}
                data={data}
                validation={validation}
                withoutButton={isDisabled}
                isDisabled={isDisabled}
                handleDelete={handleDeleteObject}
                handleChangeSelect={handleChangeSelect}
                handleChangeText={handleChangeText}
              />
            </div>
          </Card>
        </div>
      </Card>
      {!isDisabled ? (
        <div className="mt-3 flex justify-end">
          <div className="w-36 bg-atlasian-green rounded">
            <ButtonField text={"Simpan"} handler={handleSubmit} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ContentTim;
