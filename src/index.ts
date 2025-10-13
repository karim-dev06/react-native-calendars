// Core ExpandableCalendar exports
export {default as ExpandableCalendar} from './expandableCalendar';
export type {ExpandableCalendarProps} from './expandableCalendar';

// Context Provider exports
export {default as CalendarContext} from './expandableCalendar/Context';
export {default as CalendarProvider} from './expandableCalendar/Context/Provider';
export type {CalendarContextProviderProps} from './expandableCalendar/Context/Provider';

// Type exports
export type {DateData, AgendaEntry, AgendaSchedule} from './types';

// Utility exports
export {default as CalendarUtils} from './services';
export {default as LocaleConfig} from 'xdate';
