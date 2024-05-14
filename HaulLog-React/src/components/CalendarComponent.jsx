import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './components.css';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);

function CalendarComponent({ shipmentDates, onMonthChange }) {
    const events = shipmentDates.map(item => ({
        start: new Date(item.shipmentDate),
        end: new Date(item.shipmentDate),
        title: `Truck ${item.truckId}`
    }));

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
                style={{ height: '100%', width: '100%' }}
                onNavigate={handleNavigate}
                components={{
                    toolbar: CustomToolbar
                }}
            />
        </div>
    );
}

export default CalendarComponent;
