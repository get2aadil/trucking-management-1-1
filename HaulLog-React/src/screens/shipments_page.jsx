import React, { useState, useEffect } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import NavigationBar from '../components/navbar';

const apiURL = `http://${window.location.hostname}:8080`;

function LoginLandingPage() {
    const [shipmentDates, setShipmentDates] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date());

    useEffect(() => {
        const fetchShipments = async () => {
            const month = activeDate.getMonth() + 1;
            const year = activeDate.getFullYear();
            console.log("URL :" + apiURL + '/getShipmentsByDate/' + month.toString()+'/' + year.toString());
            try {
                const response = await fetch(apiURL + '/getShipmentsByDate/' + month.toString()+'/' + year.toString());
                if (response.ok) {
                    const data = await response.json();
                    const dates = data.map(item => ({
                        shipmentId: item.shipmentId,
                        truckId: item.truckId,
                        shipmentDate: new Date(item.shipmentCreatedDate)
                    }));
                    console.log(dates);
                    setShipmentDates(dates);
                } else {
                    throw new Error('Failed to fetch shipments');
                }
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, [activeDate]);

    const handleMonthChange = (date) => {
        setActiveDate(date);
    };

    return (
        <div>
            <NavigationBar />
            <div className="login-landing-container">
                <CalendarComponent shipmentDates={shipmentDates} onMonthChange={handleMonthChange} />
            </div>
        </div>
    );
}

export default LoginLandingPage;