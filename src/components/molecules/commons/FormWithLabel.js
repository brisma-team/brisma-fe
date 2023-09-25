import { ErrorValidation } from "@/components/atoms";

const FormWithLabel = ({
  label,
  form,
  labelPositionTop,
  widthLabel,
  widthForm,
  classNameLabel,
  classNameForm,
  errors,
}) => {
  return (
    <>
      <div
        className={`flex ${
          labelPositionTop ? `items-start` : `items-center`
        } my-3`}
      >
        <div
          className={`${widthLabel && widthLabel} ${
            classNameLabel && classNameLabel
          } text-sm text-brisma font-semibold`}
        >
          {label}
        </div>
        <div className={`${widthForm} ${classNameForm && classNameForm} ml-2`}>
          {form}
        </div>
      </div>
      {errors && (
        <div className="-mt-4">
          <ErrorValidation message={errors} />
        </div>
      )}
    </>
  );
};

export default FormWithLabel;
