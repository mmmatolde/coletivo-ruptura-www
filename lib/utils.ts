import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

interface CalendarEvent { 
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}

export function generateCalendarLinks(event: CalendarEvent) {
  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]|\.\d{3}/g, '');
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(event.title)}` +
    `&dates=${formatGoogleDate(event.start)}/${formatGoogleDate(event.end)}` +
    (event.description ? `&details=${encodeURIComponent(event.description)}` : '') +
    (event.location ? `&location=${encodeURIComponent(event.location)}` : '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Colectivo Ruptura//NONSGML v1.0//EN',
    'BEGIN:VEVENT',
    `UID:${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@colectivoruptura.pt`,
    `DTSTAMP:${formatGoogleDate(new Date())}`,
    `DTSTART:${formatGoogleDate(event.start)}`,
    `DTEND:${formatGoogleDate(event.end)}`,
    `SUMMARY:${event.title}`,
    (event.description ? `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}` : ''),
    (event.location ? `LOCATION:${event.location}` : ''),
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\n'); // Filter out empty strings before joining

  const icsBlob = new Blob([icsContent], { type: 'text/calendar' });
  const icsUrl = URL.createObjectURL(icsBlob);

  return { google: googleCalendarUrl, ics: icsUrl };
}
