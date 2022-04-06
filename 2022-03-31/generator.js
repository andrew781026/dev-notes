// generator.js
const {generateFonts, FontAssetType, OtherAssetType} = require('fantasticon');

// 官方文件 : https://www.npmjs.com/package/fantasticon#api
generateFonts({
  name: 'icons',
  inputDir: './svgs', // 放置 SVG 的資料夾位置 (required)
  outputDir: './dist', // 放置輸出檔案的資料夾 (required)
  fontsUrl: '',
  fontTypes: [FontAssetType.WOFF2], // font icon 格式 : eot . woff . woff2 . ttf . svg
  assetTypes: [
    OtherAssetType.CSS,
    OtherAssetType.HTML
  ],
  formatOptions: {json: {indent: 2}},
  templates: {},
  pathOptions: {},
  codepoints: {},
  fontHeight: 300,
  round: undefined, // --
  descent: undefined, // Will use `svgicons2svgfont` defaults
  normalize: undefined, // --
  selector: null,
  tag: 'i',
  prefix: 'icon',
}).then(results => {
  console.log('generate Fonts successfully')
});
