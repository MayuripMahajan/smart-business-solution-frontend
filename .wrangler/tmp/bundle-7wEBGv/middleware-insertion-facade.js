				import worker, * as OTHER_EXPORTS from "D:\\E\\Work Space\\Smart Buz Solution\\sbs-frontend\\.wrangler\\tmp\\pages-CqhPQH\\hfqlsyz3fee.js";
				import * as __MIDDLEWARE_0__ from "D:\\E\\Work Space\\Smart Buz Solution\\sbs-frontend\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "D:\\E\\Work Space\\Smart Buz Solution\\sbs-frontend\\.wrangler\\tmp\\pages-CqhPQH\\hfqlsyz3fee.js";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;