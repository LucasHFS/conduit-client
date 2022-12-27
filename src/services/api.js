import axios from "axios";
import { parseCookies } from "nookies";

export const API_URL = "http://localhost:3000/api";

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  if (cookies["conduit.token"]) {
    const api = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${cookies["conduit.token"]}`,
      },
    });

    return api;
  } else {
    const api = axios.create({
      baseURL: API_URL,
    });

    return api;
  }
}
