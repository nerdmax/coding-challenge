import { APIGatewayProxyEvent } from "aws-lambda"
import { makeHandler, ResponseErrorMessage, showsFilter } from "./handler"
import { mockedFilteredData, mockedPayload } from "./mockedData"

beforeEach(jest.clearAllMocks)

const mockedEventBodyWithoutPayload = {
  body: JSON.stringify({})
} as APIGatewayProxyEvent
const mockedEvent = {
  body: JSON.stringify({
    payload: mockedPayload
  })
} as APIGatewayProxyEvent

const mockedGetShows = jest.fn().mockReturnValue(mockedFilteredData)

describe("getShows function", () => {
  describe("gets called with mocked palyload", () => {
    test("returns desired shows array", () => {
      const filteredShows = showsFilter(mockedPayload)
      expect(filteredShows).toEqual(mockedFilteredData)
    })
  })
})

describe("purchase license handler", () => {
  describe("with event body that doesn't have payload", () => {
    const handler = makeHandler(mockedGetShows)
    it("responds with errors", async () => {
      const res = await handler(mockedEventBodyWithoutPayload)
      expect(res.statusCode).toEqual(400)
      expect(res.body).toEqual(
        JSON.stringify({ error: ResponseErrorMessage.calledWithInvalidJson })
      )
    })
  })

  describe("with getShows throwing errors", () => {
    const mockedGetShowsThrowsError = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    const handler = makeHandler(mockedGetShowsThrowsError)
    it("responds with errors", async () => {
      const res = await handler(mockedEvent)
      expect(res.statusCode).toEqual(400)
      expect(res.body).toEqual(
        JSON.stringify({ error: ResponseErrorMessage.calledWithInvalidJson })
      )
    })
  })

  describe("with everything working fine", () => {
    const handler = makeHandler(mockedGetShows)
    it("responds with desired shows", async () => {
      const res = await handler(mockedEvent)
      expect(res.body).toEqual(JSON.stringify({ response: mockedFilteredData }))
    })
  })
})
