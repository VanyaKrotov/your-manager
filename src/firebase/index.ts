import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import config from "config.json";

export const app = initializeApp(config.firebase);

export const analytics = getAnalytics(app);
