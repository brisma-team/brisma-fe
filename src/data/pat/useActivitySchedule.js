import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useActivitySchedule = (type, params) => {
  let {
    id,
    jadwal_sbp_id,
    pages,
    limit,
    sort_by,
    nama_sbp,
    start,
    end,
    tipe,
    metode,
    jenis,
    tema,
    pic,
  } = params;

  if (!pages) pages = 1;
  if (!limit) limit = 8;
  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${pages}&limit=${limit}&sortBy=nama ${sort_by}&nama_sbp=${nama_sbp}&start_date=${start}&end_date=${end}&ref_metode=${metode}&ref_tipe=${tipe}&ref_jenis=${jenis}&ref_tema=${tema}&pic=${pic}`;
      break;
    case "detail":
      query = `?pat_id=${id}&jadwal_sbp_id=${jadwal_sbp_id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    activitySchedule: data,
    activityScheduleError: error,
    activityScheduleMutate: mutate,
    activityScheduleIsLoading: isLoading,
  };
};

export default useActivitySchedule;
