import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { response, StatusCode } from "../../utils"

enum ResponseErrorMessage {
  calledWithInvalidJson = "Could not decode request: JSON parsing failed"
}

type EventBody = {
  payload: [{}]
}

type Show = {
  image: string
  slug: string
  title: string
}

type GetShows = (payload: any[]) => Show[]

const showsFilter: GetShows = payload =>
  payload.filter(show => show.drm && show.episodeCount > 0).map(show => ({
    image: show.image.showImage,
    slug: show.slug,
    title: show.title
  }))

type HandlerFactory = (
  getShows: GetShows
) => (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>

/**
 * Create a handler which takes payload which is an array of shows then filter
 * the shows and return an array of shows with certain information.
 *
 * @param getShows Function that is used to retrieve shows
 *
 * @returns The handler function that returns an error message or an array of shows.
 */
const makeHandler: HandlerFactory = getShows => async event => {
  let payload
  let filteredShows

  try {
    payload = (JSON.parse(event.body as any) as EventBody).payload
    if (!payload) {
      throw new Error()
    }
    filteredShows = getShows(payload)
  } catch (error) {
    return response(StatusCode.BadRequest, {
      error: ResponseErrorMessage.calledWithInvalidJson
    })
  }

  return response(StatusCode.Ok, { response: filteredShows })
}

const handler = makeHandler(showsFilter)

export { ResponseErrorMessage, showsFilter, EventBody, makeHandler, handler }
