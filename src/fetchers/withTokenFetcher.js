import withTokenConfig from "@/helpers/withTokenConfig";

import axios from "axios";

export default async function withTokenFetcher(path) {
	const url = `${process.env.NEXT_PUBLIC_API_URL_AUTH}${path}`;
	const response = await axios.get(url, withTokenConfig());

	return response.data;
}
