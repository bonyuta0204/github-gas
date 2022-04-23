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

    let { content, rels } = this.gateway.get(
      `${BASE_URL}/repos/${repo}/pulls`,
      { direction: "desc", sort: "created_at", state: "all", per_page: "100" }
    );

    pulls = pulls.concat(content);

    while (rels.next) {
      const response = this.gateway.get(rels.next);
      rels = response.rels;

      logProgress_(rels);

      pulls = pulls.concat(response.content);

      // 指定されているIDよりも小さなIDのPRの存在確認
      const smallerIdPull = pulls.find((pull) => pull.number <= id);

      if (smallerIdPull) {
        break;
      }
    }

    pulls = pulls.filter((pull) => pull.number >= id);
    // 昇順に並び替え
    pulls.reverse();

    return pulls;
  }
}

function logProgress_(rel: Record<string, string>) {
  const currentPage = (Number(rel.next?.match(/[&\?]page=(\d+)/)[1]) || 1) - 1;
  const lastPage = rel.last?.match(/[&\?]page=(\d+)/)[1];

  Logger.log(`Fetching page ${currentPage}/${lastPage}`);
}
