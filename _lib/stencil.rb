require 'filewatcher'
require 'sass'
require 'coffee-script'

Sass.load_paths << "_sass/"
Sass.load_paths << "_sass/helpers"
Sass.load_paths << "_sass/mixins"
Sass.load_paths << "_sass/patterns"

FILE_FOLDERS = ["_views", "_sass", "_coffee", "_layouts"]
PATTERN_FOLDER = '_patterns'
ALL_FOLDERS = FILE_FOLDERS.dup << PATTERN_FOLDER
EXCLUDED_FILES = ['.', '..', '.DS_Store']

COMPILE_TO_FOLDERS = ['./site/']

def compile_coffee path
  javascript = CoffeeScript.compile File.read(path)
  write_file path.gsub('_coffee', 'javascripts').gsub('coffee', 'js'), javascript
end

def compile_scss path
  path = "_sass/style.scss"
  stylesheet = Sass::Engine.new(File.read(path), { syntax: :scss, cache: false, style: :compressed }).render
  write_file path.gsub('_sass', 'stylesheets').gsub('scss', 'css'), stylesheet
end

def compile_html path
  html = File.read(path)
  layout = File.read("./_layouts/application.html")
  compiled_html = layout.sub!("{{content}}", html)

  write_file path.gsub('_views/', ''), compiled_html
end

def save_file path
  if path.split('/').first == '_layouts'
    save_views
  else
    file_type = path.split('.').last
    send("compile_#{file_type}", path)
  end
end

def delete_file path
  filename = path.split('_', 2).last.gsub('views/', '')
  if path.split('/').first == '_layouts'
    save_views
  else
    COMPILE_TO_FOLDERS.each do |folder|
      compiled_path = folder + filename
      File.delete(compiled_path)
      puts "Removed: #{compiled_path}"
    end
  end
end

def write_file path, content
  filename = path.split('_', 2).last
  COMPILE_TO_FOLDERS.each do |folder|
    compiled_path = folder + filename
    File.open(compiled_path, 'w') { |file| file.write(content) }
    puts "Compiled: #{compiled_path}"
  end
end

def save_folders folders
  begin
    folders.each do |folder|
      save_folder_files folder
    end
  rescue Exception => e
    puts e
  end
end

def save_folder_files folder
  Dir.entries(folder).each do |path|
    next if EXCLUDED_FILES.include?(path) or path.split('.').size == 1
    save_file "#{folder}/#{path}"
  end
end

def save_views
  save_folder_files "_views"
end

def save_patterns
  html = ""
  Dir.entries(PATTERN_FOLDER).each do |path|
    next if EXCLUDED_FILES.include? path
    pattern = File.read("_patterns/#{path}")
    pattern_html =  '<div class="stencil-pattern"><div class="stencil-display"><div class="stencil-display-content">'
    pattern_html << pattern
    pattern_html << '</div></div><div class="stencil-source"><div class="stencil-source-content"><textarea>'
    pattern_html << pattern.gsub('"', "'")
    pattern_html << '</textarea></div></div></div>'
    html << pattern_html
  end

  pattern_layout = File.read("./_layouts/patterns.html")

  layout = File.read("./_layouts/application.html")

  layout.sub!("{{content}}", pattern_layout)

  html = layout.sub!("{{content}}", html)

  File.open('site/patterns.html', 'w') { |file| file.write(html) }
  puts "Compiled patterns to site/patterns.html"
end

puts "\nYo!\n\n"

save_folders FILE_FOLDERS

save_patterns

puts "\nStencil is watching for changes …\n\n"

FileWatcher.new(ALL_FOLDERS).watch() do |path, event|
  begin
    folder = path.split('/').first.gsub('_', '')
    if folder == 'layouts'
      save_views
      save_patterns
    else
      if event == :delete
        delete_file path
      else
        save_file path
      end
    end
  rescue Exception => e
    puts e
  end
end
