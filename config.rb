Sass::Script::Number.precision = 8;
require 'compass/import-once/activate'
require 'sass-css-importer'
sass_path = 'app/src/sass'
css_path = 'app/assets/css'
relative_assets = true
line_comments = true
asset_cache_buster do |http_path, real_path|
    nil
end
