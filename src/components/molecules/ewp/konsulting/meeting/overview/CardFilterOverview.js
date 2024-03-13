import {
  ButtonIcon,
  Card,
  DatepickerStartEnd,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  MeetingTypeSelect,
  PekerjaSelect,
} from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";

const CardFilterOverview = ({
  showFilter,
  data,
  handleChange,
  handleReset,
}) => {
  return (
    showFilter && (
      <div className="rounded bg-white w-fit mt-4">
        <Card>
          <div className="px-3 py-1 flex gap-3">
            <div className="flex flex-col gap-3 w-56">
              <TextInput
                placeholder="Judul Meeting"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("judul")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) => handleChange("judul", e.target.value)}
                value={data?.judul}
              />
              <MeetingTypeSelect
                handleChange={(e) => handleChange("metode", e?.value)}
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("metode")}
                    icon={<IconClose />}
                  />
                }
                placeholder={"Metode Meeting"}
                selectedValue={
                  data?.metode?.kode
                    ? {
                        label: data?.metode?.nama,
                        value: data?.metode,
                      }
                    : null
                }
              />
            </div>
            <div className="flex flex-col gap-3 w-56">
              <PekerjaSelect
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("pic")}
                    icon={<IconClose />}
                  />
                }
                handleChange={(e) => handleChange("pic", e?.value)}
                placeholder={"PIC"}
                selectedValue={
                  data?.pic?.pn
                    ? { label: data?.pic?.name, value: data?.pic }
                    : null
                }
              />
              <PekerjaSelect
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("pembicara")}
                    icon={<IconClose />}
                  />
                }
                handleChange={(e) => handleChange("pembicara", e?.value)}
                placeholder={"Pembicara"}
                selectedValue={
                  data?.pembicara?.pn
                    ? { label: data?.pembicara?.name, value: data?.pembicara }
                    : null
                }
              />
            </div>
            <div className="flex flex-col gap-3 w-72 h-full">
              <DatepickerStartEnd
                valueStart={data?.periode_start}
                valueEnd={data?.periode_end}
                handlerChangeStart={(value) =>
                  handleChange("periode_start", value)
                }
                handlerChangeEnd={(value) => handleChange("periode_end", value)}
                placeholderStart="Mulai"
                placeholderEnd="Selesai"
                format={"DD/MM/YYYY"}
                maxDateStart={addDaysToDate(data?.periode_end, "-", 1) || null}
                minDateEnd={
                  addDaysToDate(data?.periode_start, "+", 1) ||
                  addDaysToDate(dateNow(), "+", 1) ||
                  null
                }
              />
              <PekerjaSelect
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("maker")}
                    icon={<IconClose />}
                  />
                }
                handleChange={(e) => handleChange("maker", e?.value)}
                placeholder={"Maker"}
                selectedValue={
                  data?.maker?.pn
                    ? { label: data?.maker?.name, value: data?.maker }
                    : null
                }
              />
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterOverview;
