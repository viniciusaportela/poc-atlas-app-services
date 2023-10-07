import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";
import Realm from "realm";

let app = null;
let user = null;

const appId = process.env.APP_ID;
const apiKey = process.env.API_KEY;

const confirmEmail: ValidatedEventAPIGatewayProxyEvent<{}> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  process.chdir('/tmp')

  if (!app) {
    app = new Realm.App({
      id: appId,
    });
  }

  if (!user) {
    user = app.logIn(Realm.Credentials.apiKey(apiKey));
  }

  const {token, tokenId} = event.queryStringParameters || {}
  console.log(token, tokenId, process.env.APP_ID, process.env.API_KEY)

  if (!token || !tokenId) {
    console.log("Missing token or tokenId")
    return formatJSONResponse({
      success: false
    })
  }

  await app.emailPasswordAuth.confirmUser({token, tokenId});

  return formatJSONResponse({
    success: true
  })
}

export const main = middyfy(confirmEmail, false);