const chokidar = require('chokidar');
const fs = require('fs');

const from = process.env.DACOPIER_FROM
const to = process.env.DACOPIER_TO

if (!from || !to) {
  throw new Error("You must specify env variables `DACOPIER_FROM` and `DACOPIER_TO`");
}

// add, addDir, change, unlink, unlinkDir, ready, raw, error

// One-liner for current directory
const watcher = chokidar.watch(from);

// watcher.on('all', (event, path) => {
//   console.log("all", event, path);
// });

watcher.on('add', onAdd);
watcher.on('addDir', onAddDir);
watcher.on('onChange', onChange);
watcher.on('unlink', onUnlink); falta hacer que este funque
watcher.on('unlinkDir', onUnlinkDir); falta hacer que este funque

function onAdd(path, stats) {
  var right = getToPath(path);

  var exists = fs.existsSync(right)
  if (exists) {
    fs.unlinkSync(right)
  }

  // copia
  fs.createReadStream(path)
    .pipe(fs.createWriteStream(right));
}

function onAddDir(path, stats) {
  var right = getToPath(path);

  var exists = fs.existsSync(right)
  if (!exists) {
    fs.mkdirSync(right);
  }
}

function onChange(path, stats) {
  var right = getToPath(path);

  var exists = fs.existsSync(right)
  if (exists) {
    fs.unlinkSync(right)
  }

  // copia
  fs.createReadStream(path)
    .pipe(fs.createWriteStream(right));
}

function onUnlink(path, stats) {
  var right = getToPath(path);

  var exists = fs.existsSync(right)
  if (exists) {
    fs.unlinkSync(right)
  }

}

// private

function removeFromPath(path) {
  return path.replace(from, '')
}

function getToPath(path) {
  return `${to}/${removeFromPath(path)}`.replace(/\/\//, '/')
}

