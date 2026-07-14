import "server-only";

import type{
    DailyLog,
    StrapiListResponse,
} from "./type";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;


export async function getDailyLogs(): Promise<DailyLog[]> {
    if(!STRAPI_URL) {
        throw new Error(
            "STRAPI_URL is missing from .env.local"

        );
    }
    if(!STRAPI_API_TOKEN) {
        throw new Error(
            "STRAPI_API_TOKEN is missing from .env.local"
        );
    }
   

    const response = await fetch(
        `${STRAPI_URL}/api/daily-logs?sort=logDate:desc`,
        {
            method: "GET",
            headers:
            {   
                Accept:"application/json",
                Authorization: `Bearer ${STRAPI_API_TOKEN.trim()}`,

            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
            `Failed to load Daily Logs: ${response.status} ${response.statusText}. ${errorDetails}`
        );
        
    }
    const body =
    (await response.json()) as StrapiListResponse<DailyLog>;

    return body.data;
}
