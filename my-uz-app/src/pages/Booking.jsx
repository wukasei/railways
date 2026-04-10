import { Link, useParams } from "react-router-dom";
import BookingService from "../services/BookingService";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import { useEffect, useState } from "react";
import styles from "./Booking.module.css";

function Booking(){
    const {trainId} = useParams();
    const [train, setTrain] = useState(null);
    const [wagons, setWagon] = useState([]);
    const [selectedWagon, setSelectedWagon] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const trainData = await BookingService.getTrainById(trainId);
                const wagonsData = await BookingService.getWagonByTrainId(trainId);

                setTrain(trainData);
                setWagon(wagonsData);
            }
            catch(error){
                console.error("Помилка при завантаженні даних:", error)
            }
        }
        fetchData()
    }, [trainId])

    return (
        <div className="container">
            <Link to="/" className={styles.backLink}>
                ← На головну
            </Link>
            {train ? (
                <>
                    <h1>Бронювання: {train.from} — {train.to}</h1>
                    
                    <WagonSelector 
                        wagons={wagons} 
                        onSelectWagon={setSelectedWagon} 
                    />

                    {selectedWagon && (
                        <SeatMap wagon={selectedWagon} />
                    )}
                </>
            ) : (
                <p>Завантаження інформації про рейс...</p>
            )}
        </div>
    );
}

export default Booking;