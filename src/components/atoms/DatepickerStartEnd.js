import { DatePicker } from "@atlaskit/datetime-picker";

const DatepickerStartEnd = ({
  placeholderStart,
  placeholderEnd,
  handlerChangeStart,
  handlerChangeEnd,
  valueStart,
  valueEnd,
  format,
}) => {
  return (
    <div className="flex">
      <div className="w-full">
        <DatePicker
          placeholder={placeholderStart}
          onChange={handlerChangeStart}
          value={valueStart}
          dateFormat={format}
        />
      </div>
      <div className="text-center mx-2">
        <h1>-</h1>
      </div>
      <div className="w-full">
        <DatePicker
          placeholder={placeholderEnd}
          onChange={handlerChangeEnd}
          value={valueEnd}
          dateFormat={format}
        />
      </div>
    </div>
  );
};

export default DatepickerStartEnd;
