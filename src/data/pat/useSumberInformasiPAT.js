import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSumberInformasiPAT = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/si?pat_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sumberInformasiPAT: data,
    sumberInformasiPATError: error,
    sumberInformasiPATMutate: mutate,
    sumberInformasiPATIsLoading: isLoading,
  };
};

export default useSumberInformasiPAT;
