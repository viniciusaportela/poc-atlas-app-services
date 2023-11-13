import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    APP_ID: "${ssm:/simpx-game-do-app-id}",
    API_KEY: "${ssm:/simpx-game-do-api-key}",
    GROUP_ID: "${ssm:/simpx-game-do-group-id}",
    PUBLIC_KEY: "${ssm:/simpx-game-do-public-key}",
    PRIVATE_KEY: "${ssm:/simpx-game-do-private-key}",
  },
  events: [
    {
      http: {
        method: 'post',
        path: "merge-user-providers"
      }
    }
  ]
}