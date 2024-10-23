import { getDebug } from '$lib/server/debug.js';

export async function load() {
  const debug = getDebug();
  return { debug };
}
