import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import {UserMetadataModel} from "../../schemas/user-metadata.schema";
import {middyfy} from "@libs/lambda";
import mongoose from "mongoose";

let db = null;

const MONGO_URI = process.env.MONGO_URI;

const postUserCreated: ValidatedEventAPIGatewayProxyEvent<Record<string, any>> = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!db) {
      console.log("doesnt has mongo")
      db = await mongoose.connect(MONGO_URI)
    }

    console.log(JSON.stringify(event, null, 2));
    if (event?.Records?.[0]?.body) {
      const {Records} = event;
      const [record] = Records;

      const formattedBody = JSON.parse(record.body);

      if (formattedBody?.detail?.user?.id) {
        const {user} = formattedBody.detail;
        const {id} = user;

        await new UserMetadataModel({
          userId: id,
          colorSchema: "light"
        }).save();

        return formatJSONResponse({
          success: true
        }, 500)
      }
    }

    throw new Error("Conditions unmet")
  } catch (e) {
    console.log(e)
    throw new Error("Internal Server Error")
  }
}

export const main = middyfy(postUserCreated, false)