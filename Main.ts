import { Client } from "./Client";

/**
 * create client instance
 *
 * @return {Client} Client Instance
 */
function client() {
  const token = PropertiesService.getUserProperties().getProperty("GH_TOKEN");
  if (!token) {
    throw new Error(
      "You have to set github token. Use  setToken() to set token"
    );
  }

  return new Client(token);
}
