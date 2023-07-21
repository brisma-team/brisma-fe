import { DatePicker } from "@atlaskit/datetime-picker";

const DatepickerStartEnd = ({ placeholderStart, placeholderEnd }) => {
  return (
    <div className="flex">
      <div className="w-full">
        <DatePicker placeholder={placeholderStart} />
      </div>
      <div className="text-center mx-2">
        <h1>-</h1>
      </div>
      <div className="w-full">
        <DatePicker placeholder={placeholderEnd} />
      </div>
    </div>
  );
};

export default DatepickerStartEnd;
