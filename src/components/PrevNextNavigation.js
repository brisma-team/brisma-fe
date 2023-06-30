import { IconAlignCenter, IconArrowLeft, IconArrowRight } from "./icons";
import Button from "@atlaskit/button";

const PrevNextNavigation = () => {
  return (
    <div className="flex justify-between w-32">
      <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-9 h-9">
        <Button
          shouldFitContainer
          iconBefore={<IconArrowLeft primaryColor="#0C66E4" size="large" />}
          className="bottom-0.5"
          href=""
        />
      </div>
      <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-9 h-9">
        <Button
          shouldFitContainer
          iconBefore={<IconAlignCenter primaryColor="#0C66E4" size="large" />}
          className="bottom-0.5"
        />
      </div>
      <div className="rounded-full overflow-hidden border-4 border-atlasian-blue-light w-9 h-9">
        <Button
          shouldFitContainer
          iconBefore={<IconArrowRight primaryColor="#0C66E4" size="large" />}
          className="bottom-0.5"
        />
      </div>
    </div>
  );
};

export default PrevNextNavigation;
