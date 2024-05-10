import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverview = (params) => {
  const {
    id,
    judul,
    metode,
    maker,
    periode_start,
    periode_end,
    pic,
    pembicara,
    sort_by,
    limit,
    page,
  } = params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/meeting/${id}?page=${page}&limit=${limit}&sort_by=createdAt ${sort_by}&judul=${judul}&metode=${
    metode?.kode || ""
  }&maker=${
    maker?.pn || ""
  }&periode_start=${periode_start}&periode_end=${periode_end}&pic=${
    pic?.pn || ""
  }&pembicara=${pembicara?.pn || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overview: data,
    overviewError: error,
    overviewMutate: mutate,
    overviewIsLoading: isLoading,
  };
};

export default useOverview;
