import dotenv from 'dotenv';
dotenv.config();

export const config = {
    discordToken: process.env.DISCORD_TOKEN ?? "",
    apiKey: process.env.API_KEY ?? "",
    authDomain: process.env.AUTH_DOMAIN ?? "",
    projectID: process.env.PROJECT_ID ?? "",
    storageBucket: process.env.STORAGE_BUCKET ?? "",
    messagingSenderID: process.env.MESSAGING_SENDER_ID ?? "",
    appID: process.env.APP_ID ?? "",
    measurementID: process.env.MEASUREMENT_ID ?? ""
}