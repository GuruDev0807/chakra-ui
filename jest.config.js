module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "@chakra-ui/utils": "<rootDir>/packages/utils",
    "@chakra-ui/hooks": "<rootDir>/packages/hooks",
    "@chakra-ui/system": "<rootDir>/packages/styled",
  },
  transformIgnorePatterns: ["^.+\\.js$"],
  collectCoverageFrom: [
    "**/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
}
