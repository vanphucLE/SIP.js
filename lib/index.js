// Helpful name and version exports
import { LIBRARY_VERSION } from "./version";
// Export namespaced core
import * as Core from "./core";
// Export namespaced web
import * as Web from "./platform/web";

const version = LIBRARY_VERSION;
const name = "sip.js";
export { name, version };
// Export api
export * from "./api";
// Export grammar
export * from "./grammar";
export { Core };

export { Web };
