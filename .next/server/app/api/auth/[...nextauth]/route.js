"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "./action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Eduardo_Downloads_Site_de_Sa_de_e_Hidrata_o_controle_hidrico_app_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Eduardo\\\\Downloads\\\\Site_de_Sa_de_e_Hidrata__o\\\\controle_hidrico\\\\app\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Eduardo_Downloads_Site_de_Sa_de_e_Hidrata_o_controle_hidrico_app_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNFZHVhcmRvJTVDRG93bmxvYWRzJTVDU2l0ZV9kZV9TYV9kZV9lX0hpZHJhdGFfX28lNUNjb250cm9sZV9oaWRyaWNvJTVDYXBwJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNFZHVhcmRvJTVDRG93bmxvYWRzJTVDU2l0ZV9kZV9TYV9kZV9lX0hpZHJhdGFfX28lNUNjb250cm9sZV9oaWRyaWNvJTVDYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN5RTtBQUN0SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8/MDUyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxFZHVhcmRvXFxcXERvd25sb2Fkc1xcXFxTaXRlX2RlX1NhX2RlX2VfSGlkcmF0YV9fb1xcXFxjb250cm9sZV9oaWRyaWNvXFxcXGFwcFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxFZHVhcmRvXFxcXERvd25sb2Fkc1xcXFxTaXRlX2RlX1NhX2RlX2VfSGlkcmF0YV9fb1xcXFxjb250cm9sZV9oaWRyaWNvXFxcXGFwcFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Senha\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    const res = await fetch(\"https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/auth/login\", {\n                        method: \"POST\",\n                        headers: {\n                            \"Content-Type\": \"application/json\"\n                        },\n                        body: JSON.stringify({\n                            email: credentials?.email,\n                            password: credentials?.password\n                        })\n                    });\n                    if (!res.ok) return null;\n                    const user = await res.json();\n                    console.log(\"Usu\\xe1rio autenticado:\", user);\n                    return user || null;\n                } catch (err) {\n                    console.error(\"Erro na autentica\\xe7\\xe3o:\", err);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.firstName = user.firstName;\n                token.lastName = user.lastName;\n                token.email = user.email;\n                token.age = user.age;\n                token.height = user.height // ✅ corrigido\n                ;\n                token.weight = user.weight // ✅ corrigido\n                ;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            session.user.id = token.id;\n            session.user.firstName = token.firstName;\n            session.user.lastName = token.lastName;\n            session.user.email = token.email;\n            session.user.age = token.age;\n            session.user.height = token.height // ✅ corrigido\n            ;\n            session.user.weight = token.weight // ✅ corrigido\n            ;\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"super-secret-dev\"\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWdDO0FBQ2lDO0FBRTFELE1BQU1FLGNBQWM7SUFDekJDLFdBQVc7UUFDVEYsMkVBQW1CQSxDQUFDO1lBQ2xCRyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQU87Z0JBQ3RDQyxVQUFVO29CQUFFRixPQUFPO29CQUFTQyxNQUFNO2dCQUFXO1lBQy9DO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSTtvQkFDRixNQUFNTSxNQUFNLE1BQU1DLE1BQU0scUVBQXFFO3dCQUMzRkMsUUFBUTt3QkFDUkMsU0FBUzs0QkFBRSxnQkFBZ0I7d0JBQW1CO3dCQUM5Q0MsTUFBTUMsS0FBS0MsU0FBUyxDQUFDOzRCQUNuQlgsT0FBT0QsYUFBYUM7NEJBQ3BCRyxVQUFVSixhQUFhSTt3QkFDekI7b0JBQ0Y7b0JBRUEsSUFBSSxDQUFDRSxJQUFJTyxFQUFFLEVBQUUsT0FBTztvQkFFcEIsTUFBTUMsT0FBTyxNQUFNUixJQUFJUyxJQUFJO29CQUMzQkMsUUFBUUMsR0FBRyxDQUFDLDJCQUF3Qkg7b0JBRXBDLE9BQU9BLFFBQVE7Z0JBQ2pCLEVBQUUsT0FBT0ksS0FBSztvQkFDWkYsUUFBUUcsS0FBSyxDQUFDLCtCQUF5QkQ7b0JBQ3ZDLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFFREUsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFUixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlEsTUFBTUMsRUFBRSxHQUFHVCxLQUFLUyxFQUFFO2dCQUNsQkQsTUFBTUUsU0FBUyxHQUFHVixLQUFLVSxTQUFTO2dCQUNoQ0YsTUFBTUcsUUFBUSxHQUFHWCxLQUFLVyxRQUFRO2dCQUM5QkgsTUFBTXJCLEtBQUssR0FBR2EsS0FBS2IsS0FBSztnQkFDeEJxQixNQUFNSSxHQUFHLEdBQUdaLEtBQUtZLEdBQUc7Z0JBQ3BCSixNQUFNSyxNQUFNLEdBQUdiLEtBQUthLE1BQU0sQ0FBRyxjQUFjOztnQkFDM0NMLE1BQU1NLE1BQU0sR0FBR2QsS0FBS2MsTUFBTSxDQUFHLGNBQWM7O1lBQzdDO1lBQ0EsT0FBT047UUFDVDtRQUVBLE1BQU1PLFNBQVEsRUFBRUEsT0FBTyxFQUFFUCxLQUFLLEVBQUU7WUFDOUJPLFFBQVFmLElBQUksQ0FBQ1MsRUFBRSxHQUFHRCxNQUFNQyxFQUFFO1lBQzFCTSxRQUFRZixJQUFJLENBQUNVLFNBQVMsR0FBR0YsTUFBTUUsU0FBUztZQUN4Q0ssUUFBUWYsSUFBSSxDQUFDVyxRQUFRLEdBQUdILE1BQU1HLFFBQVE7WUFDdENJLFFBQVFmLElBQUksQ0FBQ2IsS0FBSyxHQUFHcUIsTUFBTXJCLEtBQUs7WUFDaEM0QixRQUFRZixJQUFJLENBQUNZLEdBQUcsR0FBR0osTUFBTUksR0FBRztZQUM1QkcsUUFBUWYsSUFBSSxDQUFDYSxNQUFNLEdBQUdMLE1BQU1LLE1BQU0sQ0FBRyxjQUFjOztZQUNuREUsUUFBUWYsSUFBSSxDQUFDYyxNQUFNLEdBQUdOLE1BQU1NLE1BQU0sQ0FBRyxjQUFjOztZQUNuRCxPQUFPQztRQUNUO0lBQ0Y7SUFFQUMsT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFFQUYsU0FBUztRQUNQRyxVQUFVO0lBQ1o7SUFFQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlLElBQUk7QUFDekMsRUFBQztBQUVELE1BQU1DLFVBQVUxQyxnREFBUUEsQ0FBQ0U7QUFDaUI7QUFDMUMsaUVBQWV3QyxPQUFPQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJTZW5oYVwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vbTFmMjFmbmM1MC5leGVjdXRlLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS9hdXRoL2xvZ2luXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscz8uZW1haWwsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscz8ucGFzc3dvcmQsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKCFyZXMub2spIHJldHVybiBudWxsXG5cbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcmVzLmpzb24oKVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXN1w6FyaW8gYXV0ZW50aWNhZG86XCIsIHVzZXIpXG5cbiAgICAgICAgICByZXR1cm4gdXNlciB8fCBudWxsXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIG5hIGF1dGVudGljYcOnw6NvOlwiLCBlcnIpXG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcblxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWRcbiAgICAgICAgdG9rZW4uZmlyc3ROYW1lID0gdXNlci5maXJzdE5hbWVcbiAgICAgICAgdG9rZW4ubGFzdE5hbWUgPSB1c2VyLmxhc3ROYW1lXG4gICAgICAgIHRva2VuLmVtYWlsID0gdXNlci5lbWFpbFxuICAgICAgICB0b2tlbi5hZ2UgPSB1c2VyLmFnZVxuICAgICAgICB0b2tlbi5oZWlnaHQgPSB1c2VyLmhlaWdodCAgIC8vIOKchSBjb3JyaWdpZG9cbiAgICAgICAgdG9rZW4ud2VpZ2h0ID0gdXNlci53ZWlnaHQgICAvLyDinIUgY29ycmlnaWRvXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkXG4gICAgICBzZXNzaW9uLnVzZXIuZmlyc3ROYW1lID0gdG9rZW4uZmlyc3ROYW1lXG4gICAgICBzZXNzaW9uLnVzZXIubGFzdE5hbWUgPSB0b2tlbi5sYXN0TmFtZVxuICAgICAgc2Vzc2lvbi51c2VyLmVtYWlsID0gdG9rZW4uZW1haWxcbiAgICAgIHNlc3Npb24udXNlci5hZ2UgPSB0b2tlbi5hZ2VcbiAgICAgIHNlc3Npb24udXNlci5oZWlnaHQgPSB0b2tlbi5oZWlnaHQgICAvLyDinIUgY29ycmlnaWRvXG4gICAgICBzZXNzaW9uLnVzZXIud2VpZ2h0ID0gdG9rZW4ud2VpZ2h0ICAgLy8g4pyFIGNvcnJpZ2lkb1xuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxuXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxuICB9LFxuXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcblxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCB8fCBcInN1cGVyLXNlY3JldC1kZXZcIixcbn1cblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9XG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwicmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsInVzZXIiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVyciIsImVycm9yIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJpZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiYWdlIiwiaGVpZ2h0Iiwid2VpZ2h0Iiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CEduardo%5CDownloads%5CSite_de_Sa_de_e_Hidrata__o%5Ccontrole_hidrico%5Capp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();