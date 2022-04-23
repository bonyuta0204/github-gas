function setGithubToken(token: string){
  PropertiesService.getUserProperties().setProperty('GH_TOKEN', token);
}
