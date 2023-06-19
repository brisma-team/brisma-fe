import "@/styles/globals.css";
import "@atlaskit/css-reset";
import "react-datepicker/dist/react-datepicker.css";
import "react-virtualized/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Inter } from "next/font/google";

import { store } from "@/store";

import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
