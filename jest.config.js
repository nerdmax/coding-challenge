// This is the main jest config file, and runs tests across all workspaces.

module.exports = {
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "<rootDir>/packages/*/src/**/*.{ts,tsx}",
    "!<rootDir>/packages/*/src/**/*.d.ts"
  ],
  coverageDirectory: "coverage",
  testMatch: ["<rootDir>/packages/*/src/**/*.spec.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["json", "js", "ts", "jsx", "tsx"]
}
