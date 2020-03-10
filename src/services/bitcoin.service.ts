import injector from "vue-inject";
import { Axios } from "axios-observable";

const API_URL =
  "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31";

  // todo: this would ideally be injected in component using DI
export class BitcoinService {
  getData$() {
    return Axios.get(API_URL);
  }
}

injector.service("bitcoinService", BitcoinService);
