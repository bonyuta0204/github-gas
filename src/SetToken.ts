export function setToken(token: string) {
  PropertiesService.getUserProperties().setProperty("GH_TOKEN", token);
}
