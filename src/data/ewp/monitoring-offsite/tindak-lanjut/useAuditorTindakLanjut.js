import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useTindakLanjut = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/tindaklanjut/auditor/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditorTindakLanjut: data,
    auditorTindakLanjutError: error,
    auditorTindakLanjutMutate: mutate,
    auditorTindakLanjutIsLoading: isLoading,
  };
};

export default useTindakLanjut;
