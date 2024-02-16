import HttpClient from "../utilities/http.js";

export async function getApi(api) {
  const apiToken = api;
  const http = new HttpClient(apiToken);
  const result = await http.get();
  return result;
}
