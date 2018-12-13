// const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader } = require("react-app-rewired");
const rewireLessWithModule = require('react-app-rewire-less-with-modules');

module.exports = function override (config, env) {
  // config = injectBabelPlugin(['import', {
  //   libraryDirectory: 'es',
  //   libraryName: 'antd',
  //   style: true
  // }], config)
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'css',
      }) ]
    })
  };
  config = rewireLessWithModule(config, env, {
    // modifyVars: {
    //   '@primary-color': 'red',
    //   '@link-color': '#1DA57A',
    //   '@border-radius-base': '2px',
    //   '@font-size-base': '16px',
    //   '@line-height-base': '1.2'
    // },
  })
  // config.resolve = {
  //   alias: {
  //     // services: path.resolve(__dirname, 'src/services/'),
  //     utils: path.resolve(__dirname, 'src/utils/')
  //   },
  //   extensions: [ '.ts', '.js', '.json', '.css', '.tsx', '.less' ],
  // };
  return config
}