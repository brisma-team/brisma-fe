import { ButtonField } from "@/components/atoms";
import { EditorSearchIcon } from "@/components/icons";

const SearchButton = () => {
  return (
    <div className="bg-atlasian-blue-light hover:bg-atlasian-blue-dark rounded-lg h-10 items-center flex font-medium">
      <ButtonField
        icon={<EditorSearchIcon primaryColor="#fff" />}
        text="Search"
      />
    </div>
  );
};

export default SearchButton;
