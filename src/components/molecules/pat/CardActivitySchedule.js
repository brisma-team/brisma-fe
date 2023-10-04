import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import { convertToRupiah } from "@/helpers";

const Content = ({ title, text, textJustify }) => {
  return (
    <div className="w-full text-base my-2">
      <div className="font-semibold">{title}</div>
      {Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div key={i} className={`${textJustify && `text-justify`}`}>
              {v}
            </div>
          );
        })
      ) : (
        <div className={textJustify && "text-justify"}>{text}</div>
      )}
    </div>
  );
};

const CardActivitySchedule = ({
  jadwal_sbp_id,
  type,
  title,
  maker,
  audit_period,
  budget,
  pic,
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
              <p>{type.toUpperCase()}</p>
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
                handleClick={(e) => handleClickUpdate(e, jadwal_sbp_id)}
              />
              <ButtonIcon
                color={"red"}
                icon={<IconTrash size="medium" />}
                handleClick={(e) => handleClickDelete(e, jadwal_sbp_id)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full">
              <div className="flex justify-between gap-2">
                <Content title={"Maker"} text={maker} />
                <Content title={"Periode Kegiatan"} text={audit_period} />
              </div>
              <Content
                title={"Anggaran"}
                text={`Rp. ${convertToRupiah(budget)}`}
              />
              <Content title={"P.I.C"} text={pic} />
              <Content title={"Deskripsi"} text={desc} textJustify={true} />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardActivitySchedule;
