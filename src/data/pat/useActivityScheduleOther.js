import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useActivityScheduleOther = (type, params) => {
  let {
    id,
    kegiatan_lain_id,
    nama,
    start,
    end,
    tipe,
    metode,
    jenis,
    tema,
    pic,
    sort_by,
    limit,
    page,
  } = params;

  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${page}&limit=${limit}&sortBy=nama ${sort_by}&nama_kegiatan=${nama}&start_date=${start}&end_date=${end}&ref_metode=${metode}&ref_tipe=${tipe}&ref_jenis=${jenis}&ref_tema=${tema}&pic=${pic}`;
      break;
    case "detail":
      query = `?pat_id=${id}&kegiatan_lain_id=${kegiatan_lain_id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    activityScheduleOther: data,
    activityScheduleOtherError: error,
    activityScheduleOtherMutate: mutate,
    activityScheduleOtherIsLoading: isLoading,
  };
};

export default useActivityScheduleOther;
