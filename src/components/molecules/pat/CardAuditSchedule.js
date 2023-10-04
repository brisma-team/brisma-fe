import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import { convertDate, convertToRupiah } from "@/helpers";

const CardBodyContent = ({ title, text, textJustify }) => {
  return (
    <div className="w-full text-base my-2">
      <div className="font-semibold">{title}</div>
      <div className={textJustify && "text-justify"}>{text}</div>
    </div>
  );
};

const CardAuditSchedule = ({
  jadwal_id,
  type,
  title,
  maker,
  audit_team,
  start_date,
  end_date,
  budget,
  audit_type,
  tema,
  desc,
  handleClickInfo,
  handleClickUpdate,
  handleClickDelete,
}) => {
  return (
    <DivButton
      className="my-2 hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => console.log("test")}
    >
      <Card>
        <div className="w-full px-5 py-3">
          <div className="flex mb-2 justify-between items-end -ml-5 -mt-5">
            <div
              className={`text-base font-semibold rounded-tl-lg text-brisma ${
                type?.toLowerCase() === "individual"
                  ? "bg-blue-300"
                  : "bg-[#F4E3A4]"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{type?.toUpperCase()}</p>
            </div>
            <div className="flex w-20 justify-between -mb-1.5">
              <ButtonIcon
                color={"blue"}
                icon={<IconInfo size="medium" />}
                handleClick={handleClickInfo}
              />
              <ButtonIcon
                color={"yellow"}
                icon={<IconEdit size="medium" />}
                handleClick={(e) => handleClickUpdate(e, jadwal_id)}
              />
              <ButtonIcon
                color={"red"}
                icon={<IconTrash size="medium" />}
                handleClick={(e) => handleClickDelete(e, jadwal_id)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-6">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent title={"Maker"} text={maker} />
              </div>
              <div className="w-4/12">
                <CardBodyContent title={"Jenis Audit"} text={audit_type} />
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent title={"Tim Audit"} text={audit_team} />
              </div>
              <div className="w-4/12">
                <CardBodyContent title={"Tema"} text={tema} />
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent
                  title={"Periode Kegiatan"}
                  text={`${convertDate(start_date, "-")} s/d ${convertDate(
                    end_date,
                    "-"
                  )}`}
                />
              </div>
              <div className="w-4/12">
                <CardBodyContent
                  title={"Anggaran"}
                  text={`Rp. ${convertToRupiah(budget)}`}
                />
              </div>
            </div>
            <div className="w-full">
              <CardBodyContent
                title={"Deskripsi"}
                text={desc}
                textJustify={true}
              />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardAuditSchedule;
