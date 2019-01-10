import { response } from "."

describe("response function", () => {
  const statuses = [200, 500]
  const bodies = [
    {},
    { "test-key-one": "test-value-one" },
    {
      "test-key-two": {
        "test-key-two-a": "test-value-two-a",
        "test-key-two-b": ["test-value-two-b"]
      }
    }
  ]

  statuses.forEach(status => {
    it("returns a response object with the passed status", () => {
      expect(response(status, {}).statusCode).toBe(status)
    })
  })

  statuses.forEach(status => {
    bodies.forEach(body => {
      it("returns a response object with the passed body", () => {
        expect(response(status, body).body).toBe(JSON.stringify(body))
      })
    })
  })
})
