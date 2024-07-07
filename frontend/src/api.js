import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCrypto(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 2000);
  });
}

export function fakeFetchAssets(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 2000);
  });
}
