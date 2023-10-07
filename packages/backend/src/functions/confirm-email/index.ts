import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    APP_ID: "${ssm:/simpx-game-do-app-id}",
    API_KEY: "${ssm:/simpx-game-do-api-key}"
  },
  events: [
    {
      http: {
        method: 'get',
        path: "confirm-email",
      }
    }
  ]
}