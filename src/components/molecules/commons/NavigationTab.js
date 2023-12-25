import { DivButton } from "@/components/atoms";

const NavigationTab = ({
  items,
  currentStage,
  setCurrentStage,
  width,
  handleConfirmation,
}) => {
  const handleChangeCurrentStage = async (index) => {
    if (handleConfirmation) {
      const confirm = await handleConfirmation();
      if (!confirm) {
        return;
      }
    }
    setCurrentStage(index);
  };

  return items?.length ? (
    <div className={`flex border-b-2 ${width || `w-44`} justify-between mb-4`}>
      {items?.map((v, i) => {
        return (
          <DivButton
            key={i}
            className={`navbar ${v.idx === currentStage && `navbar-active`} ${
              v.isDisabled && `text-atlasian-gray-light`
            }`}
            handleClick={async () => await handleChangeCurrentStage(v.idx)}
            isDisabled={v.isDisabled}
          >
            {v.title}
          </DivButton>
        );
      })}
    </div>
  ) : (
    ""
  );
};

export default NavigationTab;
