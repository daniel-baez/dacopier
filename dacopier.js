const chokidar = require('chokidar');
const fs = require('fs');

const from = process.env.DACOPIER_FROM
const to = process.env.DACOPIER_TO

if (!from || !to) {
  throw new Error("You must specify env variables `DACOPIER_FROM` and `DACOPIER_TO`");
}

// add, addDir, change, unlink, unlinkDir, ready, raw, error

// One-liner for current directory
var watcher = null;

try {
  watcher = chokidar.watch(from);
} catch (err) {
  console.log("asdfasdas", err)
}

function on(event, _handler) {
  function handler(path, stats) {

    try {
      console.log(`event: "${event}", path: "${path}"`)
      _handler(path, stats);
    } catch (err) {
      console.log(`error while handling event: "${event}" for path: "${path}"`, err)
    }
  }

  watcher.on(event, handler);
}

setTimeout(function() {
  on('add', onAdd);
  on('addDir', onAddDir);
  on('onChange', onChange);
  console.log(`Wawtching from: "${from}" to: "${to}"`)
}, 15000)

// watcher.on('unlink', onUnlink); falta hacer que este funque
// watcher.on('unlinkDir', onUnlinkDir); falta hacer que este funque


function onAdd(path, stats) {
  var right = getToPath(path, from);

  var exists = fs.existsSync(right)
  if (exists) {
    fs.unlinkSync(right)
  }

  copy(path, right)
}

function onAddDir(path, stats) {
  var right = getToPath(path, from);
  console.log(`Creando directorio ${right}`)

  var exists = fs.existsSync(right)
  if (!exists) {
    fs.mkdirSync(right);
  }

  console.log(`Directorio ${right} creado`)
}

function onChange(path, stats) {
  var right = getToPath(path, from);

  var exists = fs.existsSync(right)
  if (exists) {
    fs.unlinkSync(right)
  }

}

function onUnlink(path, stats) {
  var right = getToPath(path, from);

  var exists = fs.existsSync(right)
  if (exists) {
    fs.unlinkSync(right)
  }

}

// private

function copy(from, to) {
  try {
    fs.createReadStream(from)
      .pipe(fs.createWriteStream(to));
  } catch (err) {
    console.log(`Error while copying ${from} -> ${to}`, err)
  }
}

function removeFromPath(path, from) {
  var from = from.replace('*', '');
  return path.replace(from, '')
}

function getToPath(path, from) {
  return `${to}/${removeFromPath(path, from)}`.replace(/\/\//, '/')
}

