export function clone_obj(c?: any) {
  const obj = {};
  for (const prop in c) {
    if (c.hasOwnProperty(prop) ) {
      obj[prop] = c[prop];
    }
  }
  return obj;
}
