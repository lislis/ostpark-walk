let debug = {
  debug: false,
  debugUser: 'lisa'
};

export function getDebug() {
  console.log(debug);
  return debug;
}

export function setDebug(state) {
  debug.debug = state;
}

export function setDebugUser(user) {
  debug.debugUser = user;
}
