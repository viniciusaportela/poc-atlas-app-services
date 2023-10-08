import {handlerPath} from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    APP_ID: "${ssm:/simpx-game-do-app-id}",
    MONGO_URI: "${ssm:/simpx-game-do-mongo-uri}"
  },
  events: [
    {
      http: {
        method: 'post',
        path: "post-user-created"
      }
    }
  ]
}