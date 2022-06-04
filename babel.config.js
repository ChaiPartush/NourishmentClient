module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
  };
};

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
