/**
 * LinkHeader for GitHub API
 *
 * @see https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28
 */
export type PageLink = {
  next?: string;
  prev?: string;
  last?: string;
  first?: string;
};

/**
 * Parses the link header and returns an object containing the page links.
 * @param {string} linkHeader - The link header string to parse.
 */
export function parseLinkHeader(linkHeader: string): PageLink {
  const links = linkHeader.split(",");
  const rels: Record<string, string> = {};
  links.forEach((link) => {
    const regMatch = link.match(/<(.*)>; rel="(\w+)"/);
    if (regMatch) rels[regMatch[2]] = regMatch[1];
  });
  return rels as PageLink;
}

export function parsePage(link: string) {
  const regMatch = link.match(/page=(\d+)/);
  if (regMatch) return Number(regMatch[1]);
}
