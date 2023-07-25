import {
  InlineEditText,
  LinkIcon,
  Select,
  ButtonField,
} from "@/components/atoms";
import {
  IconAttachment,
  IconCrossCircle,
  IconInfo,
  IconPlus,
  IconQuestions,
} from "@/components/icons";
import { CardTypeCount } from "@/components/molecules/commons";

const total = [1, 2, 1, 1];

const SubModalUnitKerja = () => {
  return (
    <div>
      <div className="w-full p-4">
        <div className="w-full flex gap-3 my-3">
          <CardTypeCount
            title={"RAO"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"BO (KC)"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"KK"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"DIVISI"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"RO (KANWIL)"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
        </div>
        <div className="w-full flex gap-3 my-3">
          <CardTypeCount
            title={"KCP"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"UNIT"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"UKLN"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"PA"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
        </div>
      </div>
      <div className="w-full font-bold text-sm px-4">
        <div className="border-2 border-[#DFE1E6] rounded-xl">
          <div className="overflow-y-scroll max-h-56">
            <div className="flex h-14">
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                <p>Aksi</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify p-3">
                <p>Branch</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify p-3">
                <p>Orgeh</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                <p>Tipe UKER</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[10%] flex items-center">
                <p className="ml-3">Info</p>
              </div>
              <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                <p>Lampiran</p>
              </div>
            </div>
            {total.map((v, i) => {
              return (
                <div className="flex" key={i}>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <LinkIcon
                      href={"#"}
                      color={"red"}
                      icon={<IconCrossCircle />}
                    />
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center justify-center text-justify p-3">
                    <div className="-mb-3 -mx-2 -mt-5 w-full">
                      <InlineEditText />
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center justify-center text-justify p-3">
                    <div className="-mb-3 -mx-2 -mt-5 w-full">
                      <InlineEditText />
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                    <Select
                      isSearchable={false}
                      optionValue={[
                        { label: "RAO", value: "RAO" },
                        { label: "BO (KC)", value: "BO (KC)" },
                        { label: "KK", value: "KK" },
                        { label: "DIVISI", value: "DIVISI" },
                        { label: "RO (Kanwil)", value: "RO (Kanwil)" },
                        { label: "KCP", value: "KCP" },
                        { label: "UNIT", value: "UNIT" },
                      ]}
                      style={`w-full`}
                    />
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[10%] flex items-center">
                    <div className="flex w-full justify-center gap-1">
                      <LinkIcon
                        href={"#"}
                        color={"yellow"}
                        icon={<IconInfo />}
                      />
                      <LinkIcon
                        href={"#"}
                        color={"blue"}
                        icon={<IconQuestions />}
                      />
                    </div>
                  </div>
                  <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <LinkIcon
                      href={"#"}
                      color={"purple"}
                      icon={<IconAttachment />}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-40 text-sm font-semibold p-2 my-1">
            <ButtonField
              iconAfter={
                <div className="text-atlasian-purple">
                  <IconPlus size="medium" />
                </div>
              }
              text={"Tambah Uker"}
              textColor={"purple"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubModalUnitKerja;
