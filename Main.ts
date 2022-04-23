import { Client } from "./Client";

function main() {
  const token = PropertiesService.getUserProperties().getProperty("GH_TOKEN");

  const client = new Client(token);

  client.fetchPulls("bonyuta0204/dotfiles");
}
