'use strict'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      compileJoined:
        options:
          join: true
        files:
          '_scripts/build/application.js': [ '_scripts/modules/*.coffee', '_scripts/*.coffee' ]

    concat:
      dist:
        src: [
          "_scripts/vendor/*.js"
          "_scripts/build/modules.js"
          "_scripts/build/application.js"
        ]
        dest: "assets/application.js"

    uglify:
      build:
        src: "assets/application.js"
        dest: "assets/application.min.js"

    sass:
      dist:
        options:
          style: 'compressed'
          sourcemap: 'none'
        files:
          'assets/application.css': ['_sass/application.scss' ]

    watch:
      sass:
        files: [ '_sass/*', '_sass/**/*' ]
        tasks: [ 'sass' ]
        options:
          spawn: false

      scripts:
        files: [
          '_scripts/**/*'
          '_scripts/*'
        ]
        tasks: [
          'coffee'
          'concat'
          'uglify'
        ]
        options:
          spawn: false

    concurrent:
      watcher:
        tasks: [
          'watch'
        ]
        options:
          logConcurrentOutput: true

    notify:
      options:
        success: false

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-concurrent"
  grunt.loadNpmTasks "grunt-notify"

  grunt.registerTask "default", [
    'coffee'
    'concat'
    'uglify'
    'notify'
    'concurrent:watcher'
  ]

  return
