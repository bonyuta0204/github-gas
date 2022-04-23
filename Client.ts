import { Gateway } from "./Gateway";

export class Client {
  gateway: Gateway;

  constructor(token: string) {
    this.gateway = new Gateway(token);
  }

  /*
   * @description
   * リポジトリのPRの一覧を取得する
   *
   * @param repo {string} リポジトリ名 (e.g. google/clasp)
   */
  fetchPulls(repo: string, params?: Record<string, string>) {
    return this.gateway.get(`repos/${repo}/pulls`, params);
  }

  /*
   * @description
   * 指定されたID以降のすべてのPRを取得する
   *
   * @param repo {string} リポジトリ名 (e.g. google/clasp)
   * @param repo {number} PRのID
   */
  fetchPullsByOldestId(repo: string, id: number) {
    let pulls = []

    //const this.fetchPulls(repo, {sort: 'created', direction: 'desc'})
  } 
}
