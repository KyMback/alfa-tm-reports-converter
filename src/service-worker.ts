import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare const self: any;

clientsClaim();
self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);
