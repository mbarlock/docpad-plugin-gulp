# Export Plugin
module.exports = (BasePlugin) ->
  # Define Plugin
  class GulpPlugin extends BasePlugin
    # Name
    name: 'gulp'

    # Configuration
    config:
      writeAfter: []

    # Constructor
    constructor: (opts)->

      # Prepare
      super

      # Dependencies
      @safeps = require('safeps')
      @path = require('path')
      @glob = require('glob')

      # Chain
      @

    writeBefore: (opts, next) ->
      if tasks = @getConfig().writeBefore or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    writeAfter: (opts, next) ->
      if tasks = @getConfig().writeAfter or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    renderBefore: (opts, next) ->
      if tasks = @getConfig().renderBefore or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    renderAfter: (opts, next) ->
      if tasks = @getConfig().renderAfter or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    generateBefore: (opts, next) ->
      if tasks = @getConfig().generateBefore or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    generateAfter: (opts, next) ->
      if tasks = @getConfig().generateAfter or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    populateCollectionsBefore: (opts, next) ->
      if tasks = @getConfig().populateCollectionsBefore or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    populateCollections: (opts, next) ->
      if tasks = @getConfig().populateCollections or false
        @processGulp(tasks, opts, next)
      else
        return next()
      @

    # Process the gulp tasks.
    processGulp: (tasks, opts, next) ->
      # Prepare
      rootPath = @docpad.getConfig().rootPath

      # Find the gulp path
      files = @glob.sync '**/gulp/bin/gulp.js',
        cwd: rootPath
        nosort: true

      # Check whether or not the file was found
      if gulpPath = files[0] or false
        # Construct the command line arguments for gulp
        command = [@path.join rootPath, gulpPath]
        command.push task for task in tasks or []

        # Execute
        @safeps.spawn(command, {cwd: rootPath, output: true}, next)

      else
        err = new Error('Could not find the gulp command line interface.')
        return next(err); err

      # Chain
      @