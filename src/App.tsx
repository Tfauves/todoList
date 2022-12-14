import React, {useEffect, useState} from 'react';
import './App.css';
import Reminder from './models/reminder';
import RemindersList from './components/RemindersList';
import reminderService from './services/reminder';
import NewReminder from './components/NewReminder';

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([{id: 1, title: 'Reminder 1'}]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  }

  const removeReminder = async (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  }

  const addReminder = async (title: string) => {
    const newReminder = await reminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <RemindersList items={reminders} onRemoveReminder={removeReminder} />    
    </div>
  );
}

export default App;
