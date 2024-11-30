import { initTranslate } from "./function";
const pageName = window.location.pathname.replace(".html", "").split("/")[2];
initTranslate(pageName);
