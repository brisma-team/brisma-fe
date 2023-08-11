// import withTokenFetcher from "@/fetchers/withTokenFetcher";
// import useSWR from "swr";

export default function useFilterCatalog(type, filter) {
  let parameters = "";
  const { uker, tahun, projectid, projectname } = filter;
  switch (type) {
    case 1:
      parameters = `type=${type}&name=${projectname}`;
      break;
    case 2:
      parameters = `type=${type}&uker=${uker}&tahun=${tahun}&projectid=${projectid}`;
      break;
    case 3:
      parameters = `type=${type}&uker=${uker}&tahun=${tahun}&projectid=${projectid}`;
      break;
    default:
      parameters;
      break;
  }
  if (parameters != "") {
    const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/list?${parameters}`;
    console.log(path);
    //   const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
    //   return {
    //     data: data,
    //     error: error,
    //     mutate: mutate,
    //     isLoading: isLoading,
    //   };
  } else {
    return {
      data: [],
      error: "Invalid Parameters",
      isLoading: true,
    };
  }
}
