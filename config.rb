Sass::Script::Number.precision = 8;
require 'compass/import-once/activate'
# Require any additional compass plugins here.
require 'support-for'
require 'normalize-scss'
require 'sass-css-importer'

# Set this to the root of your project when deployed:
sass_path = 'app/src/sass'
css_path = 'app/assets/css'

# You can select your preferred output style here (can be overridden via the command line):
#output_style = :expanded #or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

# To disable asset cache buster (removes time-stamp hash)
asset_cache_buster do |http_path, real_path|
    nil
end

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# set encoding
Encoding.default_external = 'utf-8'

# sass_options = {:fonts_dir => { fonts_dir }}

# module Sass::Script::Functions
#     def get_option_fonts_dir(value)
#         rgbz = options[:fonts_dir][value]
#         # rgbz = options[:custom][:custom_colors][value.to_s].scan(/^#?(..?)(..?)(..?)$/).first.map {|a| a.ljust(2, a).to_i(16)}
#         Sass::Script::Color.new(rgb)
#     end
# end

# module Sass::Script::Functions
#     def json(Sass::Script::String)
#         require 'rubygems'
#         require 'json'
#         JSON.parse(string)
#     end
# end
