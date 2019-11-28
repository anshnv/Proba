const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackExternalsPlugin = require ('html-webpack-externals-plugin')
const autoprefixer = require('autoprefixer');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  //assets: './'
  //попробовать assets:''
  //assets:'.'
  assets:''
}


module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    //page: PATHS.src
		page: `${PATHS.src}/index.js`
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    //publicPath: '/'
	
  },
  module: {
    rules: [
		{
      test: /\.js$/,
			loader: 'babel-loader',
      exclude: '/node_modules/'
    }, 
	//{
      //test: /\.vue$/,
      //loader: 'vue-loader',
      //options: {
        //loader: {
          //scss: 'vue-style-loader!css-loader!sass-loader'
        //}
      //}
    //}, 
	{
      test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
      loader: 'file-loader',
      options: {
			//outputPath: `${PATHS.src}img`,
		
			name: '[name].[ext]'
      }
    }, 
		{
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }
				, {
          loader: 'postcss-loader',
          options: { sourceMap: true, 
											config: { path: `${PATHS.src}/js/postcss.config.js` }, 
											plugins: ()=>[autoprefixer()]
										}
					}
				, 
				{
          loader: 'sass-loader',
          options: { sourceMap: true, 
						sassOptions: {
							includePaths: ['./node_modules']
						}
					}
        }
      ]
    }, 
	{
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }
				, 
				{
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
        }
      ]
	  
    },
	{
		test: /\.pug$/,
		use: [
			'html-loader?attrs=false', 
			{loader:'pug-html-loader',
			options: {pretty: true}}
			]
	}
	]
  },
  //resolve: {
  //  alias: {
		// bind version of jquery-ui
		//"jquery-ui": "jquery-ui/jquery-ui.js",
		// bind to modules;
	//	modules: path.join(__dirname, "node_modules"),
    //  'vue$': 'vue/dist/vue.js'
  //  }
  //},
  plugins: [
    //new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
	  
    }),
	
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
	  filename: './index.html',
	  template:	`${PATHS.src}/index.pug`,
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img` },
      //{ from: `${PATHS.src}/static`, to: '' },
			{ from: `${PATHS.src}/fonts`, to: `${PATHS.dist}/css/fonts` },
    ]),
	new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      //'window.jQuery': 'jquery',
			//'window.$': 'jquery'
    }),
	//new HtmlWebpackPlugin(),
	//new HtmlWebpackExternalsPlugin({ // optional plugin: inject cdn
      //externals: [
        //{
            //module: 'jquery',
            //entry: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
        //}
      //],
	//new HtmlWebpackExternalsPlugin({ // optional plugin: inject cdn
      //externals: [
        //{
            //module: 'jquery',
            //entry: 'dist/jquery.min.js',
			//global: 'jQuery',
        //}
      //]
    //})
  ]
  
}