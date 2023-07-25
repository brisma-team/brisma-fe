import { ButtonField, Card } from "@/components/atoms";
import { IconPlus } from "@/components/icons";

const CardBodyContent = ({ handler, children }) => {
  return (
    <Card>
      <div className="px-4 w-full h-full">
        {children}
        {handler && (
          <div className="w-full flex justify-end mb-2">
            <div className="bg-atlasian-purple text-white font-semibold rounded">
              <ButtonField
                iconAfter={<IconPlus size="medium" primaryColor="#fff" />}
                text={"Tambahkan Biaya"}
                handler={handler}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardBodyContent;
