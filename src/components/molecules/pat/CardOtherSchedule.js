import Link from "next/link";
import { Card, LinkIcon } from "@/components/atoms";
import { IconEdit, IconTrash } from "@/components/icons";

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
  type,
  title,
  maker,
  audit_period,
  member,
  budget_detail,
  total_budget_planning,
  desc,
  href,
}) => {
  return (
    <Link
      className="m-2 hover:bg-gray-100 hover:rounded-[10px] hover:no-underline w-[29rem]"
      href={href}
    >
      <Card>
        <div className="w-full px-5 py-3">
          <div className="flex mb-2 justify-between">
            <div
              className={`text-base font-semibold rounded-tl-lg text-brisma ${
                type === "lain-lain" ? "bg-[#C094C4]" : "bg-[#AED3C3]"
              } -ml-5 -mt-5 px-5 h-9 flex items-center justify-center`}
            >
              <p>{type.toUpperCase()}</p>
            </div>
            <div className="flex w-14 justify-between">
              <LinkIcon color={"yellow"} icon={<IconEdit size="medium" />} />
              <LinkIcon color={"red"} icon={<IconTrash size="medium" />} />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-6">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <div className="w-full">
              <Content title={"Maker"} text={maker} />
              <Content title={"Periode Kegiatan"} text={audit_period} />
              <Content title={"Anggota"} text={member} />
              <Content
                title={"Anggaran"}
                text={budget_detail}
                isArrayObject={true}
              />
              <Content
                title={"Total Rencana Anggaran"}
                text={total_budget_planning}
                justifyBetween={true}
              />
              <Content title={"Deskripsi"} text={desc} textJustify={true} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CardOtherSchedule;
