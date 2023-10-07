import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler, jsonBodyParser = true) => {
  const middified = middy(handler);

  if (jsonBodyParser) {
    middified.use(middyJsonBodyParser());
  }

  return middified;
}
