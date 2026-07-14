import { DailyLogForm } from "@/features/journal/components/daily-log-form";

export default function NewDailyLogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="mb-3 font-semibold text-purple-600">
            Fieldnote
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Record your day
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Capture what you worked on, what you learned
            and what should happen next.
          </p>
        </header>

        <DailyLogForm />
      </div>
    </main>
  );
}