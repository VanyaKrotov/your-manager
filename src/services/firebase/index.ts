import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import config from "config.json";

export const app = initializeApp(config.firebase);

export const auth = getAuth(app);

export const db = getDatabase(app);
