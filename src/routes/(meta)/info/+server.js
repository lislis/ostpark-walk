import { json } from '@sveltejs/kit';
import { setDebug, setDebugUser } from '$lib/server/debug';

export async function POST({ request }) {
  const formData = await request.formData();
  const state = formData.get('enableDebug');
  const user = formData.get('selectUser');

  let data = {
    success: true,
    errors: {}
  };

  if (user) {
    setDebugUser(user);
    return json(data);
  } else if (state && state == 'on') {
    setDebug(true);
  } else {
    setDebug(false);
  }
  return json(data);
}
