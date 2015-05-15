# Export Plugin
module.exports = (BasePlugin) ->
  # Define Plugin
  class GulpPlugin extends BasePlugin
    # Name
    name: 'gulp'

    # Configuration
    config:
      background: false
      writeAfter: []

    createEventHandlers: (docpad) ->
      # Retain the local scope to allow manipulation of DocPad events
      docpad.getEvents().forEach (eventName) =>
        @[eventName] = (opts, next) =>
          if tasks = @getConfig()[eventName] or false
            @processGulp(tasks, opts, next)
          else
            return next()
          @
      @

    # Constructor
    constructor: (opts)->
      # create eventHandlers
      {docpad} = opts
      @createEventHandlers(docpad)

      # Prepare
      super

      # Dependencies
      @safeps = require('safeps')
      @path = require('path')
      @glob = require('glob')

      # Chain
      @

    # Process the gulp tasks.
    processGulp: (tasks, opts, next) ->
      # Prepare
      rootPath = @docpad.getConfig().rootPath

      console.log(@getConfig());

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
        if !@getConfig().background
          @safeps.spawn(command, {cwd: rootPath, output: true}, next)
        else
          @safeps.spawn(command, {cwd: rootPath, output: true})
          next()
      else
        err = new Error('Could not find the gulp command line interface.')
        return next(err); err

      # Chain
      @
