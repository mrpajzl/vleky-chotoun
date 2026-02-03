/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as cameras from "../cameras.js";
import type * as conditions from "../conditions.js";
import type * as lifts from "../lifts.js";
import type * as news from "../news.js";
import type * as operatingStatus from "../operatingStatus.js";
import type * as pricing from "../pricing.js";
import type * as seed from "../seed.js";
import type * as settings from "../settings.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  cameras: typeof cameras;
  conditions: typeof conditions;
  lifts: typeof lifts;
  news: typeof news;
  operatingStatus: typeof operatingStatus;
  pricing: typeof pricing;
  seed: typeof seed;
  settings: typeof settings;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
