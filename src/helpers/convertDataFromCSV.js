import Papa from "papaparse";

const convertDataFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      delimiter: ";",
      header: true,
      complete: function (result) {
        console.log("result => ", result);
        const getColumns = Object.keys(result.data[0]);
        if (
          !(
            getColumns?.length &&
            getColumns?.map((v) => v?.toLocaleLowerCase())?.includes("no")
          )
        ) {
          reject(new Error("Format file tidak sesuai!"));
          return;
        }

        const lowercaseData = result.data.map((item) => {
          return Object.keys(item).reduce((acc, key) => {
            acc[key.toLowerCase()] = item[key];
            return acc;
          }, {});
        });

        const mappingColumns = Object.keys(lowercaseData[0])?.filter(
          (key) => lowercaseData[0][key].trim() !== ""
        );

        const mappingData = lowercaseData
          .map((item) => {
            const mappedItem = {};
            mappingColumns.forEach((key) => {
              if (key.trim() !== "") {
                mappedItem[key] = item[key];
              }
            });
            return mappedItem;
          })
          .filter((item) => {
            return Object.values(item).some(
              (value) => value !== undefined && value !== ""
            );
          });

        resolve({
          filename: file?.name,
          columns: mappingColumns,
          data: mappingData,
          total_data: mappingData?.length,
        });
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};

export default convertDataFromCSV;
