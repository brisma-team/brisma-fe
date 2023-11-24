const { DivButton } = require("@/components/atoms");

const NavigationTab = ({ items, currentStage, setCurrentStage }) => {
  return items?.length ? (
    <div className="flex border-b-2 w-44 justify-between mb-4">
      {items?.map((v, i) => {
        return (
          <DivButton
            key={i}
            className={`navbar ${v.idx === currentStage && `navbar-active`} ${
              v.isDisabled && `text-atlasian-gray-light`
            }`}
            handleClick={() => setCurrentStage(v.idx)}
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
