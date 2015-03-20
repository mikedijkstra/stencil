'use strict'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    autoprefixer:
      options:
        silent: false
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      single_file:
        src: '.build/application.css'
        dest: '.build/application.prefixed.css'

    coffee:
      compileJoined:
        options:
          join: true
        files:
          '.build/coffee.js': [ 'scripts/**/*.coffee', 'scripts/*.coffee' ]

    concat:
      dist:
        src: [
          "vendor/**/*.js"
          "vendor/*.js"
          "scripts/**/*.js"
          "scripts/*.js"
          ".build/coffee.js"
        ]
        dest: "assets/application.js"

    concat_css:
      all:
        src: [
          "vendor/*.css"
          ".build/application.prefixed.css"
        ]
        dest: "assets/application.css"

    connect:
      server:
        options:
          port: 8000
          hostname: 'localhost'
          open: true
          base: '_site'
          livereload: true

    copy:
      main:
        files: [
          { expand: true, src: ['assets/*'], dest: '_site/', filter: 'isFile' }
        ]

    cssmin:
      target:
        files: 'assets/application.min.css': ['assets/application.css']

    exec:
      deploy:
        command: 'git subtree push --prefix _site origin gh-pages'
        stdout: false
        stderr: false

    liquid:
      options:
        includes: './includes'
      pages:
        files: [
          { expand: true, flatten: true, src: 'templates/*.liquid', dest: '_site/', ext: '.html' }
        ]

    sass:
      dist:
        options:
          style: 'expanded'
          sourcemap: 'none'
        files:
          '.build/application.css': ['sass/application.sass' ]

    uglify:
      build:
        src: "assets/application.js"
        dest: "assets/application.min.js"

    watch:
      copy:
        files: [ 'assets/**/*', 'assets/*' ]
        tasks: [ 'copy' ]

      liquid:
        files: [ 'includes/*', 'templates/*' ]
        tasks: [ 'liquid' ]

      sass:
        files: [ 'sass/*', 'sass/**/*' ]
        tasks: [ 'sass', 'autoprefixer', 'concat_css', 'cssmin', 'copy' ]

      scripts:
        files: [ 'scripts/**/*', 'scripts/*' ]
        tasks: [ 'coffee', 'concat', 'uglify' ]

      livereload:
        files: [ '_site/**/*' ]
        options:
          livereload: true

    notify:
      options:
        title: "Stencil"
        success: true
        duration: 3

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks 'grunt-concat-css'
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-concurrent"
  grunt.loadNpmTasks "grunt-notify"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-liquid'
  grunt.loadNpmTasks 'grunt-exec'
  grunt.loadNpmTasks 'grunt-autoprefixer'

  grunt.registerTask "default", [
    'notify'
    'copy'
    'connect'
    'watch'
  ]

  grunt.registerTask "deploy", [
    'exec:deploy'
  ]

  grunt.registerTask "watch_sass", [
    'watch:sass'
  ]

  grunt.registerTask "watch_scripts", [
    'watch:scripts'
  ]

  return
