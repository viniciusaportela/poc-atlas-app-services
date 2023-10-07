import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import Realm from "realm";
import {middyfy} from "@libs/lambda";
import schema from "@functions/register/schema";

let app = null;

const appId = process.env.APP_ID;

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    process.chdir('/tmp')

    if (!app) {
      app = new Realm.App({
        id: appId,
      });
    }

    const {email, password} = event.body;
    console.log(email, password)

    if (!email || !password) {
      console.log("missing email or password")
      return formatJSONResponse({
        success: false
      })
    }

    await app.emailPasswordAuth.registerUser({email, password});

    return formatJSONResponse({
      success: true
    })
  } catch (e) {
    console.log(e)
    return formatJSONResponse({
      success: false
    })
  }
}

export const main = middyfy(register)