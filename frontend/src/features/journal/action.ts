"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


function getRequiredText(
    formData:FormData,
    fieldName: string
): string {
    const value = formData.get(fieldName);

    if(typeof value !== "string" || !value.trim()) 
    {
        throw new Error(`${fieldName} is required`);
    }

    return value.trim();
}

function getOptionalText(
    formData: FormData,
    fieldName: string
): string | null {
    const value = formData.get(fieldName);

    if(typeof value !== "string" || !value.trim()) {
        return null;
    }

    return value.trim();
}

export async function createDailyLog(
    formData: FormData
): Promise<void> {
    const strapiUrl = process.env.STRAPI_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if(!strapiUrl || !apiToken){
        throw new Error(
            "the Strapi environment variables are missing"
        );

    }

    const logDateValue = getRequiredText(
        formData,"logDate"
    );

    const logDate = new Date(logDateValue);

    if(Number.isNaN(logDate.getTime())) {
        throw new Error("please enter a valid time and date");
    }

    const title = getRequiredText(formData, "title");
    const workCompleted = getRequiredText(
        formData,"workCompleted"
    );
    const learning = getOptionalText(
        formData,"learning"
    );
    const challenges = getOptionalText(
        formData,
        "challenges"
    );
    const solutions = getOptionalText(
        formData,"solutions"
    );
    const nextSteps = getOptionalText(
        formData,
        "nextSteps"
    );
    const hoursValue = getOptionalText(
        formData,
        "hoursWorked"
    );
    const hoursWorked =
    hoursValue === null ? null : Number(hoursValue);

    if(
        hoursWorked !== null && (!Number.isFinite(hoursWorked) || 
        hoursWorked < 0 ||
        hoursWorked > 24)
    ) {
        throw new Error(
            "Hours between 0 and 24"
        );

    }
    const submittedState = getRequiredText(
        formData,
        "entryState"
    );

    const entryState =
      submittedState === "complete" ? "complete" : "draft";

    const response = await fetch(
        `${strapiUrl}/api/daily-logs`,
        {
            method: "POST" ,
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${apiToken.trim()}`,
            },
            body: JSON.stringify({
                data: {
                    logDate: logDate.toISOString(),
                    title,
                    workCompleted,
                    learning,
                    challenges,
                    solutions,
                    nextSteps,
                    hoursWorked,
                    entryState
                },
            }),
        }
    );

    if(!response.ok) {
        const errorDetails = await response.text();

        throw new Error(
            `Failed to create Daily Log: ${response.status}. ${errorDetails}`
        );
    }

    revalidatePath("/journal");
    redirect("/journal");

}