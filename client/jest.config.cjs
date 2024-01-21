module.exports = {
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    },
}