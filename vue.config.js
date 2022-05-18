const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new GoogleFontsPlugin({
        fonts: [
          { family: "Poppins", variants: [ "500", "700" ] }
        ]
      })
    ]
  }
}