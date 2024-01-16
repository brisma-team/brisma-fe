import DatepickerField from "./Datepicker";

const DatepickerStartEnd = ({
  placeholderStart,
  placeholderEnd,
  handlerChangeStart,
  handlerChangeEnd,
  valueStart,
  valueEnd,
  format,
  isDisabled,
  minDateStart,
  maxDateStart,
  minDateEnd,
  maxDateEnd,
}) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <DatepickerField
          placeholder={placeholderStart}
          handleChange={handlerChangeStart}
          value={valueStart}
          format={format}
          isDisabled={isDisabled}
          minDate={minDateStart && minDateStart}
          maxDate={maxDateStart && maxDateStart}
        />
      </div>
      <div className="text-center mx-2">
        <h1>-</h1>
      </div>
      <div className="w-full">
        <DatepickerField
          placeholder={placeholderEnd}
          handleChange={handlerChangeEnd}
          value={valueEnd}
          format={format}
          isDisabled={isDisabled}
          minDate={minDateEnd && minDateEnd}
          maxDate={maxDateEnd && maxDateEnd}
        />
      </div>
    </div>
  );
};

export default DatepickerStartEnd;
