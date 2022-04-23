import { Gateway } from "./Gateway";

const BASE_URL = "https://api.github.com";


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
    let pulls = [];

    let {content, rels} = this.gateway.get(`${BASE_URL}/repos/${repo}/pulls`, {directrion: 'desc', sort: 'created_at'})

    pulls = pulls.concat(content)

    while(rels.next){
      Logger.log(rels.next)
      const response = this.gateway.get(rels.next)
      rels = response.rels
      pulls = pulls.concat(response.content)
    }

    return pulls
  }
}
