/**
 * 集中所有请求
 */
const modules = import.meta.glob(['./module/*.js'], { eager: true });

const apis = {};
for (const path in modules) {
  const exp = path.match(/.*\/(.*)\.js$/);
  if (exp[1]) {
    apis[exp[1]] = modules[path].default;
  }
}

export default apis;
