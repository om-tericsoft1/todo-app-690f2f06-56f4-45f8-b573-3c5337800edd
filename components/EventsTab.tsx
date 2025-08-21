'use client';

import { useState } from 'react';
import { Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description?: string;
}

export function EventsTab() {
  const [events, setEvents] = useState<Event[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const addEvent = () => {
    if (titleInput.trim() === '' || dateInput === '' || timeInput === '') return;
    
    const newEvent: Event = {
      id: Date.now(),
      title: titleInput.trim(),
      date: dateInput,
      time: timeInput,
      description: descriptionInput.trim() || undefined,
    };
    
    setEvents([...events, newEvent]);
    setTitleInput('');
    setDateInput('');
    setTimeInput('');
    setDescriptionInput('');
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addEvent();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-sm text-red-600 dark:text-red-300">
          {events.length === 0 ? 'No events scheduled' : `${events.length} event${events.length !== 1 ? 's' : ''} scheduled`}
        </p>
      </div>

      <div className="space-y-3">
        <Input
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Event title..."
          className="w-full"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full"
          />
          <Input
            type="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="w-full"
          />
        </div>

        <Input
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Description (optional)..."
          className="w-full"
        />

        <Button 
          onClick={addEvent}
          className="w-full"
          disabled={!titleInput.trim() || !dateInput || !timeInput}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center py-8 text-red-500 dark:text-red-400">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No events yet. Add one above!</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-md border border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-800 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 dark:text-red-100 mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-red-600 dark:text-red-300 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTime(event.time)}
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-red-700 dark:text-red-200">
                      {event.description}
                    </p>
                  )}
                </div>
                
                <Button
                  onClick={() => deleteEvent(event.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}