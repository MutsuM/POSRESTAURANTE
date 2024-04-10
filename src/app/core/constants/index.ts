import { environment } from '../../../environments/environment'

const ENV: any = environment.env

const URL_DEV = "https://6bf2-2800-200-e2b0-1a5-d0d1-c9fe-f4fb-2e41.ngrok.io";
const URL_QA = "https://c10f-2800-200-e2b0-469-9c8c-d2d8-e7c3-602a.ngrok.io";
const URL_PRD = "https://c10f-2800-200-e2b0-469-9c8c-d2d8-e7c3-602a.ngrok.io";

const PrefixUrl = "!";

const URI = (ENV === "DEV") ? URL_DEV : (ENV === "QA") ? URL_QA : URL_PRD;

export {
    URI,
    PrefixUrl
}