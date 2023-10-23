import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const CardFilterSummary = ({ showFilter, data, handleChangeFilter }) => {
  return (
    showFilter && (
      <div className="max-w-fit mt-3">
        <Card>
          <div className="flex gap-3 py-1 px-3">
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Kode UKER"
                  onChange={(e) =>
                    handleChangeFilter("uker_kode", e.target.value)
                  }
                  value={data.uker_kode}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("uker_kode", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Nama UKER"
                  onChange={(e) =>
                    handleChangeFilter("uker_name", e.target.value)
                  }
                  value={data.uker_name}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("uker_name", "")}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Tipe UKER"
                  onChange={(e) =>
                    handleChangeFilter("tipe_uker", e.target.value)
                  }
                  value={data.tipe_uker}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("tipe_uker", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Major"
                  onChange={(e) =>
                    handleChangeFilter("sub_major", e.target.value)
                  }
                  value={data.sub_major}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("sub_major", "")}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Aktifitas"
                  onChange={(e) =>
                    handleChangeFilter("aktivitas", e.target.value)
                  }
                  value={data.aktivitas}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("aktivitas", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Aktifitas"
                  onChange={(e) =>
                    handleChangeFilter("sub_aktivitas", e.target.value)
                  }
                  value={data.sub_aktivitas}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("sub_aktivitas", "")
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Risk"
                  onChange={(e) => handleChangeFilter("risk", e.target.value)}
                  value={data.risk}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("risk", "")}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterSummary;
