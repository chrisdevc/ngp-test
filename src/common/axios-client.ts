import injector from "vue-inject";
import { AxiosRequestConfig } from "axios";
import { Axios } from "axios-observable";

// default to actual bpi endpoint
const DEFAULT_CONFIG = Object.freeze({
  baseURL: "https://api.coindesk.com/v1"
}) as AxiosRequestConfig;

// this can be a shared client with shared config
export class CommonAxiosClient {
  private axiosClient: Axios;

  constructor() {
    this.axiosClient = Axios.create(DEFAULT_CONFIG);
  }

  get() {
    return this.axiosClient;
  }
}
injector.service("commonAxiosClient", CommonAxiosClient);
