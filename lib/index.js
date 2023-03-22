// Helpful name and version exports
import { LIBRARY_VERSION } from "./version";
import * as Core from "./core";
import * as Web from "./platform/web";

const version = LIBRARY_VERSION;
const name = "sip.js";
export { name, version };
// Export api
export * from "./api";
// Export grammar
export * from "./grammar";
// Export namespaced core
export { Core };
// Export namespaced web
export { Web };
