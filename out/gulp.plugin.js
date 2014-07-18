(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  module.exports = function(BasePlugin) {
    var GulpPlugin;
    return GulpPlugin = (function(_super) {
      __extends(GulpPlugin, _super);
      GulpPlugin.prototype.name = 'gulp';
      GulpPlugin.prototype.config = {
        writeAfter: [],
        writeBefore: false,
        renderBefore: false,
        renderAfter: false,
        generateBefore: false,
        generateAfter: false,
        populateCollectionsBefore: false,
        populateCollections: false
      };
      function GulpPlugin() {
        GulpPlugin.__super__.constructor.apply(this, arguments);
        this.safeps = require('safeps');
        this.path = require('path');
        this.glob = require('glob');
        this;
      }
      GulpPlugin.prototype.writeBefore = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().writeBefore || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };
      GulpPlugin.prototype.writeAfter = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().writeAfter || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };
      GulpPlugin.prototype.renderBefore = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().renderBefore || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };
      GulpPlugin.prototype.renderAfter = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().renderAfter || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };
      GulpPlugin.prototype.generateBefore = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().generateBefore || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };

      GulpPlugin.prototype.generateAfter = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().generateAfter || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };

      GulpPlugin.prototype.populateCollectionsBefore = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().populateCollectionsBefore || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };

      GulpPlugin.prototype.populateCollections = function(opts, next) {
        var tasks;
        if (tasks = this.getConfig().populateCollections || false) {
          this.processGulp(tasks, opts, next);
        } else {
          return next();
        }
        return this;
      };

      GulpPlugin.prototype.processGulp = function(task, opts, next) {
        var command, err, files, gulpPath, rootPath, task, _i, _len, _ref;
        rootPath = this.docpad.getConfig().rootPath;
        files = this.glob.sync('**/gulp/bin/gulp.js', {
          cwd: rootPath,
          nosort: true
        });
        if (gulpPath = files[0] || false) {
          command = [this.path.join(rootPath, gulpPath)];
          command.push(task);
          this.safeps.spawn(command, {
            cwd: rootPath,
            output: true
          }, next);
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