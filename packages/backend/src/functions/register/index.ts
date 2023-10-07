import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    APP_ID: "${ssm:/simpx-game-do-app-id}",
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'register',
      }
    }
  ]
}