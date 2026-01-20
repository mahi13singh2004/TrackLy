import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enIN from "date-fns/locale/en-IN";
import { useEffect, useState } from "react";

import { useApplicationStore } from "../store/application.store.js";
import { useReminderStore } from "../store/reminder.store.js";

const locales = {
  "en-IN": enIN
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const CustomToolbar = ({ date, onNavigate }) => {
  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToCurrent = () => {
    onNavigate('TODAY');
  };

  return (
    <div className="flex justify-between items-center mb-4 text-white">
      <button
        onClick={goToBack}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
      >
        ← Previous
      </button>

      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-semibold">
          {format(date, 'MMMM yyyy')}
        </h3>
        <button
          onClick={goToCurrent}
          className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors duration-200"
        >
          Today
        </button>
      </div>

      <button
        onClick={goToNext}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
      >
        Next →
      </button>
    </div>
  );
};

const CalendarPage = () => {
  const { applications, getApplications } = useApplicationStore();
  const { reminders, getReminder } = useReminderStore();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getApplications();
    getReminder();
  }, []);

  const applicationEvents = applications.map((app) => ({
    title: `${app.company} - ${app.role}`,
    start: new Date(app.appliedDate),
    end: new Date(app.appliedDate),
    allDay: true,
    type: "application"
  }));

  const reminderEvents = reminders.map((rem) => ({
    title: `Reminder: ${rem.title}`,
    start: new Date(rem.date),
    end: new Date(rem.date),
    allDay: true,
    type: "reminder"
  }));

  const events = [...applicationEvents, ...reminderEvents];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">
          Calendar View
        </h2>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            className="text-white"
            date={date}
            onNavigate={setDate}
            view="month"
            views={['month']}
            components={{
              toolbar: CustomToolbar
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
