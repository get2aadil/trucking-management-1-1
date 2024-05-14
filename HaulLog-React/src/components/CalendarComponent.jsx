import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);

function CalendarComponent({ shipmentDates, onMonthChange }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const events = shipmentDates.map(item => ({
        start: new Date(item.shipmentDate),
        end: new Date(item.shipmentDate),
        title: `Truck ${item.truckId}`,
        ...item
    }));

    const handleNavigate = (date) => {
        onMonthChange(date);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
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
                onSelectEvent={handleSelectEvent}
                components={{
                    toolbar: CustomToolbar
                }}
            />
            {selectedEvent && (
                <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                    <DialogTitle>Shipment Details</DialogTitle>
                    <DialogContent>
                        <p><strong>Shipment ID:</strong> {selectedEvent.shipmentId}</p>
                        <p><strong>Truck ID:</strong> {selectedEvent.truckId}</p>
                        <p><strong>Shipment Date:</strong> {new Date(selectedEvent.shipmentDate).toLocaleDateString()}</p>
                        {/* Add any other details you want to display here */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}

export default CalendarComponent;
