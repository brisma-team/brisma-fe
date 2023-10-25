import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";
import { convertToRupiah } from "@/helpers";

const Content = ({
  title,
  text,
  textJustify,
  justifyBetween,
  isArrayObject,
}) => {
  return (
    <div
      className={`w-full text-base my-2 ${
        justifyBetween && `flex justify-between`
      }`}
    >
      <div className="font-semibold">{title}</div>
      {isArrayObject ? (
        text.map((v, i) => {
          return (
            <div key={i} className={`flex justify-between`}>
              <div>{v.title}</div>
              <div>{v.value}</div>
            </div>
          );
        })
      ) : Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div
              key={i}
              className={`${textJustify && `text-justify`} ${
                justifyBetween && `flex justify-end`
              }`}
            >
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

const CardOtherSchedule = ({
  kegiatan_lain_id,
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
      className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => console.log("test")}
    >
      <Card>
        <div className="w-full px-5 py-3">
          <div className="flex mb-2 justify-between items-end -ml-5 -mt-5">
            <div
              className={`text-base font-semibold rounded-tl-lg text-brisma ${
                type?.toLowerCase() === "lain-lain"
                  ? "bg-[#C094C4]"
                  : "bg-[#AED3C3]"
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
                handleClick={(e) => handleClickUpdate(e, kegiatan_lain_id)}
              />
              <ButtonIcon
                color={"red"}
                icon={<IconTrash size="medium" />}
                handleClick={(e) => handleClickDelete(e, kegiatan_lain_id)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full flex">
              <div className="w-8/12">
                <Content title={"Maker"} text={maker} />
              </div>
              <div className="w-4/12">
                <Content title={"Periode Kegiatan"} text={audit_period} />
              </div>
            </div>
            <Content
              title={"Anggaran"}
              text={`Rp. ${convertToRupiah(budget)}`}
            />
            <Content title={"P.I.C"} text={pic} />
            <Content title={"Deskripsi"} text={desc} textJustify={true} />
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOtherSchedule;
