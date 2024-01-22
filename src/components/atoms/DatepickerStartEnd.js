import DatepickerField from "./Datepicker";
import ErrorValidation from "./ErrorValidation";

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
  validationStart,
  validationEnd,
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
        {validationStart ? (
          <ErrorValidation message={validationStart} className={"ml-1 mt-4"} />
        ) : (
          ""
        )}
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
        {validationEnd ? (
          <ErrorValidation message={validationEnd} className={"ml-1 mt-4"} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DatepickerStartEnd;
