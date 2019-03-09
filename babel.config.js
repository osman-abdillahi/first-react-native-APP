module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
	plugins: [["@babel/proposal-throw-expressions"] , ["@babel/plugin-proposal-decorators", { "legacy": true }]]
}
