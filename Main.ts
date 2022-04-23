import { Client } from "./Client";

function main() {
  const token = PropertiesService.getUserProperties().getProperty("GH_TOKEN");

  const client = new Client(token);

  const pulls = client.fetchPullsByOldestId("microsoft/vscode", 0);

  Logger.log(pulls.map((pull)=>{return {number: pull.number, title: pull.title}}));
}
