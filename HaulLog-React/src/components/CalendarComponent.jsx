import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './components.css';

const localizer = momentLocalizer(moment);

const events = [
    // Example events, replace with your shipmentDates data
    {
        start: new Date(),
        end: new Date(),
        title: 'Shipment 1',
    },
];

function CalendarComponent({ shipmentDates, onMonthChange }) {
    const handleNavigate = (date) => {
        onMonthChange(date);
    };

    return (
        <div className='big-calendar-container'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '90vh', width: '90vw' }}
                onNavigate={handleNavigate}
            />
        </div>
    );
}

export default CalendarComponent;
