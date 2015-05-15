// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = function(BasePlugin) {
    var GulpPlugin;
    return GulpPlugin = (function(_super) {
      __extends(GulpPlugin, _super);

      GulpPlugin.prototype.name = 'gulp';

      GulpPlugin.prototype.config = {
        background: false,
        writeAfter: []
      };

      GulpPlugin.prototype.createEventHandlers = function(docpad) {
        var _this = this;
        docpad.getEvents().forEach(function(eventName) {
          return _this[eventName] = function(opts, next) {
            var tasks;
            if (tasks = _this.getConfig()[eventName] || false) {
              _this.processGulp(tasks, opts, next);
            } else {
              return next();
            }
            return _this;
          };
        });
        return this;
      };

      function GulpPlugin(opts) {
        var docpad;
        docpad = opts.docpad;
        this.createEventHandlers(docpad);
        GulpPlugin.__super__.constructor.apply(this, arguments);
        this.safeps = require('safeps');
        this.path = require('path');
        this.glob = require('glob');
        this;
      }

      GulpPlugin.prototype.processGulp = function(tasks, opts, next) {
        var command, err, files, gulpPath, rootPath, task, _i, _len, _ref;
        rootPath = this.docpad.getConfig().rootPath;
        console.log(this.getConfig());
        files = this.glob.sync('**/gulp/bin/gulp.js', {
          cwd: rootPath,
          nosort: true
        });
        if (gulpPath = files[0] || false) {
          command = [this.path.join(rootPath, gulpPath)];
          _ref = tasks || [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            task = _ref[_i];
            command.push(task);
          }
          if (!this.getConfig().background) {
            this.safeps.spawn(command, {
              cwd: rootPath,
              output: true
            }, next);
          } else {
            this.safeps.spawn(command, {
              cwd: rootPath,
              output: true
            });
            next();
          }
        } else {
          err = new Error('Could not find the gulp command line interface.');
          return next(err);
          err;
        }
        return this;
      };

      return GulpPlugin;

    })(BasePlugin);
  };

}).call(this);
