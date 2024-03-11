import {
  ButtonIcon,
  Card,
  DatepickerField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { PekerjaSelect } from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";

const CardFilterTable = ({ showFilter, data, handleChange, handleReset }) => {
  return showFilter ? (
    <div className="mt-4 w-[30rem]">
      <Card>
        <div className="w-full px-4 py-2 flex flex-col gap-3 items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="w-1/2">
              <TextInput
                placeholder="Nama Dokumen"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("doc_name")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) => handleChange("doc_name", e.target.value)}
                value={data?.doc_name || ""}
              />
            </div>
            <div className="w-1/2">
              <PekerjaSelect
                handleChange={(e) => handleChange("uploader", e.value)}
                selectedValue={
                  data?.uploader?.pn
                    ? {
                        label: data?.uploader?.name,
                        value: data?.uploader,
                      }
                    : null
                }
                placeholder={"Uploader"}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("uploader")}
                    icon={<IconClose />}
                  />
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <div className="w-1/2">
              <DatepickerField
                placeholder={"Mulai Tanggal"}
                value={data?.start_date}
                format={"DD-MM-YYYY"}
                handleChange={(value) => handleChange("start_date", value)}
                maxDate={addDaysToDate(data?.end_date, "-", 1) || null}
              />
            </div>
            <div className="w-1/2">
              <DatepickerField
                placeholder={"Sampai Tanggal"}
                value={data?.end_date}
                format={"DD-MM-YYYY"}
                handleChange={(value) => handleChange("end_date", value)}
                minDate={
                  addDaysToDate(data?.start_date, "+", 1) ||
                  addDaysToDate(dateNow(), "+", 1) ||
                  null
                }
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default CardFilterTable;
