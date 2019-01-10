import { APIGatewayProxyResult } from "aws-lambda"
import { StatusCode } from "."

/**
 * Construct an API response with the passed status and body object. Always
 * returns a valid JSON object in the response body.
 */
const response = (status: StatusCode, body: object): APIGatewayProxyResult => ({
  statusCode: status,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  },
  isBase64Encoded: false,
  body: JSON.stringify(body)
})

export { response }
