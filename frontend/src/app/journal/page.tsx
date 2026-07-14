import { getDailyLogs } from "@/features/journal/api";


const dateFormatter = new Intl.DateTimeFormat("en-GB",
    {dateStyle:"medium",
        timeStyle: "short"
    }
);
export default async function JournalPage() {
    const logs = await getDailyLogs();

    return(
   <main className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 px-6 py-12 text-slate-900">
    <div className="mx-auto max-w-4xl">
        <header className="mb-10">
            <p className="mb-3 font-semibold text-purple-600">
                Fieldnote
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
                internship journal
            </h1>
            <p className="mt-3 text-slate-600">
                A record of your work,learning and progress.
            </p>

        </header>
        {logs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-purple-300 bg-white/70 p-10 text-center">
                <h2 className="text-xl font-semibold">
                   No journal entries yet
                </h2>
                <p className="mt-2 text-slate-600">
                  what did you do today in during your internship 
                </p>
            </div>
        ) : (
            <section className="space-y-6">
                {logs.map((log) => (
                    <article 
                    key={log.documentId}
                    className="rounded-3xl border border-white bg-white/80 p-7 shadow-sm backdrop-blur">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <time
                                dateTime={log.logDate}
                                className="text-sm font-medium text-purple-600">
                                    {dateFormatter.format(
                                        new Date(log.logDate)
                                    )}
                                </time>
                                <h2 className="mt-2 text-2xl font-bold">
                                    {log.title}
                                </h2>
                            </div>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                                {log.entryState}
                            </span>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-semibold">
                             Work completed
                            </h3>
                            <p className="mt-2 leading-7 text-slate-700">
                             {log.workCompleted}
                            </p>
                        </div>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {log.learning && (
                                <div className="rounded-2xl bg-yellow-50 p-5">
                                    <h3 className="font-semibold">
                                        what i learned

                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-700">
                                      {log.learning}
                                    </p>
                                </div>
                            )}
                            {log.challenges && (
                                <div className="rounded-2xl bg-pink-50 p-5">
                                    <h4 className="font-semibold">
                                        challenge
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-slate-700">
                                        {log.challenges}
                                    </p>
                                </div>

                               ) }

                        </div>
                        {log.hoursWorked !==  null && (
                            <p className="mt-6 text-sm text-slate-500">
                             {log.hoursWorked} hours recorded
                            </p>
                        )}
                    </article>
                ))

                }
            </section>
        )}
    </div>
   </main>
    );
}