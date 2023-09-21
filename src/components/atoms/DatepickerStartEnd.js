import { dateNow } from "@/helpers";
import { DatePicker } from "@atlaskit/datetime-picker";

const DatepickerStartEnd = ({
  placeholderStart,
  placeholderEnd,
  handlerChangeStart,
  handlerChangeEnd,
  valueStart,
  valueEnd,
  format,
  isDisabled,
  pastDate,
}) => {
  return (
    <div className="flex">
      <div className="w-full">
        <DatePicker
          placeholder={placeholderStart}
          onChange={handlerChangeStart}
          value={valueStart}
          dateFormat={format}
          isDisabled={isDisabled}
          minDate={pastDate && dateNow()}
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
          isDisabled={isDisabled}
          minDate={pastDate && valueStart}
        />
      </div>
    </div>
  );
};

export default DatepickerStartEnd;
