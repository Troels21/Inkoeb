import './App.css';
import Indhold from "./Component/Indhold";
import {indkoebStore} from "./Stores/IndkoebStore";
import {BrowserTracing} from "@sentry/tracing";
import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://71379769231243c4a6ecb1b4484fd645@o4504162458664960.ingest.sentry.io/4504162460303360",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

function App() {
    indkoebStore.fetchVarer()
    return (
    <Indhold/>
    );
}

export default App;
