module.exports = {
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    },
}