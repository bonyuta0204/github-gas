import { GitHubHelper } from "./GitHubHelper";

const gitHubHelper = new GitHubHelper();

export class Gateway {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  headers() {
    return {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  get<T>(path: string, params?: Record<string, string>) {
    const url = params
      ? `${path}?${buildQuery_(params).toString()}`
      : `${path}`;

    const response = UrlFetchApp.fetch(url, {
      method: "get",
      headers: this.headers(),
    });

    const headers = response.getHeaders() as Record<string, string>;

    const linkHeader = headers["Link"];

    return {
      content: JSON.parse(response.getContentText()) as T,
      pageLink: linkHeader
        ? gitHubHelper.parseLinkHeader(linkHeader)
        : undefined,
    };
  }
}

const buildQuery_ = (
  obj: Record<string, string>,
  encode: boolean = true,
): string => {
  return Object.keys(obj)
    .map((key) => {
      if (encode) {
        return `${key}=${encodeURIComponent(obj[key])}`;
      } else {
        return `${key}=${obj[key]}`;
      }
    })
    .join("&");
};
