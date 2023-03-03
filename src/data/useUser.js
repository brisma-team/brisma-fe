import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUser() {
	const path = "/login";
	const { data, error, mutate } = useSWR(path, withTokenFetcher);

	return {
		user: data,
		userError: error,
		userMutate: mutate,
	};
}
