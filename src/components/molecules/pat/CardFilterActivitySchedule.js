import {
  Card,
  DatepickerStartEnd,
  Select,
  TextInput,
} from "@/components/atoms";

const CardFilterActivitySchedule = ({ showFilter }) => {
  return (
    showFilter && (
      <Card>
        <div className="flex flex-wrap m-2 gap-3 px-2">
          <div className="w-48">
            <TextInput placeholder="Nama Proyek" />
          </div>
          <div className="w-48">
            <Select
              optionValue={[]}
              isSearchable={false}
              placeholder={"Metode Audit"}
            />
          </div>
          <div className="w-48">
            <DatepickerStartEnd
              placeholderStart={"Start"}
              placeholderEnd={"End"}
            />
          </div>
          <div className="w-48">
            <Select
              optionValue={[]}
              isSearchable={false}
              placeholder={"Tipe Audit"}
            />
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterActivitySchedule;
