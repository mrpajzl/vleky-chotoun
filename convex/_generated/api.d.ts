/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as cameras from "../cameras.js";
import type * as conditions from "../conditions.js";
import type * as lifts from "../lifts.js";
import type * as migrate_bilingual from "../migrate_bilingual.js";
import type * as news from "../news.js";
import type * as operatingStatus from "../operatingStatus.js";
import type * as pricing from "../pricing.js";
import type * as settings from "../settings.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  cameras: typeof cameras;
  conditions: typeof conditions;
  lifts: typeof lifts;
  migrate_bilingual: typeof migrate_bilingual;
  news: typeof news;
  operatingStatus: typeof operatingStatus;
  pricing: typeof pricing;
  settings: typeof settings;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
