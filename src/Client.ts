import { Gateway } from "./Gateway";
import { PageLink, GitHubHelper, PullListResponse } from "./GitHubHelper";

const BASE_URL = "https://api.github.com";

const githubHelper = new GitHubHelper();

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
    let pulls: PullListResponse = [];

    const response = this.gateway.get<PullListResponse>(
      `${BASE_URL}/repos/${repo}/pulls`,
      {
        direction: "desc",
        sort: "created_at",
        state: "all",
        per_page: "100",
      }
    );

    let pageLink = response.pageLink;

    pulls = pulls.concat(response.content);

    while (pageLink?.next) {
      const response = this.gateway.get<PullListResponse>(pageLink.next);
      pageLink = response.pageLink;
      if (pageLink) logProgress(pageLink);

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

function logProgress(pageLink: PageLink) {
  const currentPage = pageLink.next
    ? githubHelper.parsePage(pageLink.next) ?? 0
    : 0;
  const lastPage = pageLink.last
    ? githubHelper.parsePage(pageLink.last) ?? 0
    : 0;

  Logger.log(`Fetching page ${currentPage}/${lastPage}`);
}
