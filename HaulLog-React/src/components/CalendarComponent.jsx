import React from "react";
// import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './components.css';

function CalendarComponent({shipmentDates, onMonthChange}) {
    
    console.log("Shipment", shipmentDates);
    const tileClassName = ({date,view}) => {
        // Check for shipment Dates
        
        if(view === 'month' && shipmentDates.some(
            d => new Date(d).toDateString() === date.toDateString()
        )) {
            return 'highlight';
        }
    }

    return (
        <div className='react-calendar'>
            <Calendar 
            onChange={onMonthChange} 
            onActiveStartDateChange={({activeStartDate, view}) => view === 'month' && onMonthChange(activeStartDate)}
            tileClassName={tileClassName} />
        </div>
    );
}

export default CalendarComponent;