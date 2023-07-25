import Link from "next/link";
import { Card, LinkIcon } from "@/components/atoms";
import { IconEdit, IconInfo, IconTrash } from "@/components/icons";

const CardBodyContent = ({ title, text, textJustify }) => {
  return (
    <div className="w-full text-base my-2">
      <div className="font-semibold">{title}</div>
      <div className={textJustify && "text-justify"}>{text}</div>
    </div>
  );
};

const CardAuditSchedule = ({
  type,
  title,
  maker,
  audit_team,
  budget,
  audit_type,
  category,
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
                type === "individual" ? "bg-blue-300" : "bg-[#F4E3A4]"
              } -ml-5 -mt-5 px-5 h-9 flex items-center justify-center`}
            >
              <p>{type.toUpperCase()}</p>
            </div>
            <div className="flex w-20 justify-between">
              <LinkIcon color={"blue"} icon={<IconInfo size="medium" />} />
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
            <div className="w-full flex">
              <div className="w-8/12">
                <CardBodyContent title={"Maker"} text={maker} />
                <CardBodyContent title={"Tim Audit"} text={audit_team} />
                <CardBodyContent
                  title={"Periode Kegiatan"}
                  text={"24-06-2023 s/d 31-07-2023"}
                />
              </div>
              <div className="w-4/12">
                <CardBodyContent title={"Jenis Audit"} text={audit_type} />
                <CardBodyContent title={"Kategori"} text={category} />
                <CardBodyContent title={"Anggaran"} text={budget} />
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
    </Link>
  );
};

export default CardAuditSchedule;
