module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      compileJoined:
        options:
          join: true
        files:
          '_scripts/build/application.js': [ '_scripts/*.coffee' ]

    concat:
      dist:
        src: [
          "_vendor/*.js"
          "_scripts/build/application.js"
        ]
        dest: "site/assets/application.js"

    uglify:
      build:
        src: "site/assets/application.js"
        dest: "site/assets/application.min.js"

    sass:
      dist:
        options:
          style: 'compressed'
        files:
          'site/assets/application.css': ['_sass/application.scss' ]

    watch:
      sass:
        files: [ '_sass/*', '_sass/**/*' ]
        tasks: [ 'sass' ]
        options:
          spawn: false

      scripts:
        files: [
          '_vendor/*.js'
          '_scripts/*.js'
          '_scripts/*.coffee'
          'assets/application.js'
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
    'sass'
    'notify'
    'concurrent:watcher'
  ]

  return
