import React, {useEffect, useState} from "react";
import './styles.css';
import NavigationBar from '../components/navbar';
import CalendarComponent from '../components/CalendarComponent';


function LoginLandingPage() {
    const [ shipmentDates, setShipmentDates] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date());
    const apiURL = `http://${window.location.hostname}:8080`;

    useEffect(() => {
        const fetchShipments = async () => {
            const month = activeDate.getMonth() + 1;
            const year = activeDate.getFullYear();
            console.log("URL :" + apiURL + '/getShipmentsByDate/' + month.toString()+'/' + year.toString())
            try {
                const response = await fetch(apiURL + '/getShipmentsByDate/' + month.toString()+'/' + year.toString());
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data[0].shipmentCreatedDate);
                    const dates = data.map(item => new Date(item.shipmentCreatedDate));
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
            <NavigationBar/>
            <div className="login-landing-container">
                <CalendarComponent shipmentDates={shipmentDates} onMonthChange={handleMonthChange}/>
            </div>
        </div>
    );
}

export default LoginLandingPage;