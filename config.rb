Sass::Script::Number.precision = 8;
require 'compass/import-once/activate'
require 'sass-css-importer'
# sass-globbing
# Syntax: @import '<dir>/*';
# Windows syntax: @import '<dir>/*.*';
# https://github.com/chriseppstein/sass-globbing/issues/3
require 'sass-globbing'
add_import_path 'node_modules'
add_import_path Sass::CssImporter::Importer.new('node_modules')
sass_path = 'src/sass'
css_path = 'src/assets/css'
relative_assets = true
line_comments = true
asset_cache_buster do |http_path, real_path|
    nil
end
