import Link from "next/link";

import { createDailyLog } from "../action";

const inputStyles =
  "mt-2 w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

const labelStyles =
  "block text-sm font-semibold text-slate-700";

export function DailyLogForm() {
  return (
    <form
      action={createDailyLog}
      className="space-y-7 rounded-3xl border border-white bg-white/80 p-7 shadow-sm backdrop-blur md:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelStyles}>
          Date and time
          <input
            className={inputStyles}
            type="datetime-local"
            name="logDate"
            required
          />
        </label>

        <label className={labelStyles}>
          Hours worked
          <input
            className={inputStyles}
            type="number"
            name="hoursWorked"
            min="0"
            max="24"
            step="0.25"
            placeholder="For example: 6.5"
          />
        </label>
      </div>

      <label className={labelStyles}>
        Entry title
        <input
          className={inputStyles}
          type="text"
          name="title"
          required
          maxLength={120}
          placeholder="What was the main focus today?"
        />
      </label>

      <label className={labelStyles}>
        Work completed
        <textarea
          className={inputStyles}
          name="workCompleted"
          required
          rows={5}
          placeholder="Describe the tasks you completed."
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelStyles}>
          What I learned
          <textarea
            className={inputStyles}
            name="learning"
            rows={4}
            placeholder="What new knowledge or skill did you gain?"
          />
        </label>

        <label className={labelStyles}>
          Challenges
          <textarea
            className={inputStyles}
            name="challenges"
            rows={4}
            placeholder="What problems did you encounter?"
          />
        </label>

        <label className={labelStyles}>
          Solutions
          <textarea
            className={inputStyles}
            name="solutions"
            rows={4}
            placeholder="How did you handle those problems?"
          />
        </label>

        <label className={labelStyles}>
          Next steps
          <textarea
            className={inputStyles}
            name="nextSteps"
            rows={4}
            placeholder="What should you work on next?"
          />
        </label>
      </div>

      <label className={labelStyles}>
        Entry state
        <select
          className={inputStyles}
          name="entryState"
          defaultValue="draft"
          required
        >
          <option value="draft">Draft</option>
          <option value="complete">Complete</option>
        </select>
      </label>

      <div className="flex flex-wrap justify-end gap-4 border-t border-purple-100 pt-6">
        <Link
          href="/journal"
          className="rounded-full border border-purple-200 px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="rounded-full bg-purple-600 px-7 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          Save entry
        </button>
      </div>
    </form>
  );
}