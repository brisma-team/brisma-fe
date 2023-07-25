import "@/styles/globals.css";
import "@/styles/ckeditor.css";
import "@atlaskit/css-reset";
import "react-datepicker/dist/react-datepicker.css";
import "react-virtualized/styles.css";
import "react-loading-skeleton/dist/skeleton.css";

import { store } from "@/store";

import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
