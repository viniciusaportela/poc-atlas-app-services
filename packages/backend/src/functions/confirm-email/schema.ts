export default {
  type: "object",
  properties: {
    token: {
      type: "string"
    },
    tokenId: {
      type: "string"
    }
  },
  required: ["token", "tokenId"]
} as const;