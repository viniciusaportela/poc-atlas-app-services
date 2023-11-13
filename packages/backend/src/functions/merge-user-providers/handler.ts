import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";
import Realm from "realm";
import * as process from "process";

let app = null;
let user = null;

const appId = process.env.APP_ID;
const apiKey = process.env.API_KEY;
const groupId = process.env.GROUP_ID;
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

const mergeUserProviders: ValidatedEventAPIGatewayProxyEvent<{}> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  process.chdir('/tmp')

  console.log(appId, apiKey, groupId, publicKey, privateKey)

  try {
    if (!app) {
      app = new Realm.App({
        id: appId,
      });
    }

    if (!user) {
      user = app.logIn(Realm.Credentials.apiKey(apiKey));
    }

    const tokenRes = await fetch("https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username: publicKey, apiKey: privateKey}),
    })

    const {token} = await tokenRes.json();
    console.log("got token")

    const users = await fetch(`https://realm.mongodb.com/api/admin/v3.0/groups/${groupId}/apps/${appId}/users`, {})
    console.log(users);

  } catch (e) {
    console.error(e);
    throw new Error("Internal Server Error");
  }
}

export const main = middyfy(mergeUserProviders, false);