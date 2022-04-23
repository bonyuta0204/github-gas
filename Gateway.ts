
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

  get(path: string, params?: Record<string, string>) {
    const url = params
      ? `${path}?${buildQuery(params).toString()}`
      : `${path}`;

    const response = UrlFetchApp.fetch(url, {
      method: "get",
      headers: this.headers(),
    });
    return {
      content: JSON.parse(response.getContentText()),
      rels: parseLinkHeader(response.getHeaders()["Link"]),
    };
  }
}

const buildQuery = (obj: object, encode: boolean = true): string => {
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
/*
 * @description
 * LinkHeaderをパースする
 *
 * @param {string} linkHeader linkHeaderの文字列 e.g. <https://api.github.com/repositories/41881900/pulls?page=2>; rel="next", <https://api.github.com/repositories/41881900/pulls?page=10>; rel="last"
 *
 * @return パースしたオブジェクト
 *  {
 *    next: "https://api.github.com/repositories/41881900/pulls?page=2",
 *    last: "https://api.github.com/repositories/41881900/pulls?page=10"
 *  }
 */
function parseLinkHeader(
  linkHeader: string | undefined
): Record<string, string> {
  if (!linkHeader) return {};
  var links = linkHeader.split(",");
  const rels = {};
  links.forEach((link) => {
    const regMatch = link.match(/<(.*)>; rel="(\w+)"/);
    rels[regMatch[2]] = regMatch[1];
  });
  return rels;
}
