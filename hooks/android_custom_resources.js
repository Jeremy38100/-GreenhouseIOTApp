var fs = require('fs');
var path = require('path');

console.log("After prepare hook");

var sourceDir = 'resources/android/custom';
var platformDir = 'platforms/android';
var resourceDirs = [
  'app/src/main/res/drawable-land-ldpi',
  'app/src/main/res/drawable-land-mdpi',
  'app/src/main/res/drawable-land-hdpi',
  'app/src/main/res/drawable-land-xhdpi',
  'app/src/main/res/drawable-land-xxhdpi',
  'app/src/main/res/drawable-land-xxxhdpi',
  'app/src/main/res/drawable-port-ldpi',
  'app/src/main/res/drawable-port-mdpi',
  'app/src/main/res/drawable-port-hdpi',
  'app/src/main/res/drawable-port-xhdpi',
  'app/src/main/res/drawable-port-xxhdpi',
  'app/src/main/res/drawable-port-xxxhdpi',
  'app/src/main/res/mipmap-ldpi',
  'app/src/main/res/mipmap-mdpi',
  'app/src/main/res/mipmap-hdpi',
  'app/src/main/res/mipmap-xhdpi',
  'app/src/main/res/mipmap-xxhdpi',
  'app/src/main/res/mipmap-xxxhdpi',
  'app/src/main/res/drawable-ldpi',
  'app/src/main/res/drawable-mdpi',
  'app/src/main/res/drawable-hdpi',
  'app/src/main/res/drawable-xhdpi',
  'app/src/main/res/drawable-xxhdpi',
  'app/src/main/res/drawable-xxxhdpi'
];

module.exports = function(ctx) {
  if (ctx.opts.platforms.indexOf('android') < 0) {
    return;
  }

  var Q = ctx.requireCordovaModule('q');
  var deferred = Q.defer();
  var androidPlatformDir = path.join(ctx.opts.projectRoot, platformDir);
  var customResourcesDir = path.join(ctx.opts.projectRoot, sourceDir);

  function copy(src, dest) {
    var deferred = Q.defer();

    fs.stat(src, function(err, stats) {
      if (err || !stats.isFile()) {
        return deferred.reject(err);
      }

      fs.stat(path.dirname(dest), function(err, stats) {
        if (err || !stats.isDirectory()) {
          return deferred.reject(err);
        }

        var rs = fs.createReadStream(src);

        rs.on('error', function(err) {
          console.error(err.stack);
          deferred.reject(err);
        });

        var ws = fs.createWriteStream(dest);

        ws.on('error', function(err) {
          console.error(err.stack);
          deferred.reject(err);
        });

        ws.on('close', function() {
          deferred.resolve();
        });

        rs.pipe(ws);
      });
    });

    return deferred.promise;
  }

  fs.stat(customResourcesDir, function(err, stats) {
    if (err || !stats.isDirectory()) {
      return deferred.resolve();
    }

    fs.readdir(customResourcesDir, function(err, files) {
      var copies = [];

      for (var i in files) {
        for (var j in resourceDirs) {
          var filePath = path.join(ctx.opts.projectRoot, sourceDir, files[i]);
          var destPath = path.join(androidPlatformDir, resourceDirs[j], files[i]);

          copies.push([filePath, destPath]);
        }
      }

      copies.map(function(args) {
        return copy.apply(copy, args);
      });

      Q.all(copies).then(function(r) {
        deferred.resolve();
      }, function(err) {
        console.error(err.stack);
        deferred.reject(err);
      });
    });
  });

  return deferred.promise;
}