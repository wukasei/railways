import { Link, useParams } from "react-router-dom";
import BookingService from "../services/BookingService";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import { useEffect, useState } from "react";
import styles from "./Booking.module.css";

function Booking() {
    const { trainId } = useParams();
    const [train, setTrain] = useState(null);
    const [wagons, setWagons] = useState([]);
    const [selectedWagon, setSelectedWagon] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const trainData = await BookingService.getTrainById(trainId);
                const wagonsData = await BookingService.getWagonByTrainId(trainId);
                setTrain(trainData);
                setWagons(wagonsData);
            } catch (error) {
                console.error("Помилка при завантаженні даних:", error);
            }
        }
        fetchData();
    }, [trainId]);

    return (
        <div className={styles.pageWrapper}>
            <header className={styles.blueHeader}>
                <div className={styles.headerContent}>
                    <Link to="/" className={styles.backLink}>
                        ← На головну
                    </Link>
                    {train && (
                        <h1>Бронювання: {train.from} — {train.to}</h1>
                    )}
                    <p className={styles.subHeader}>Швидко • Надійно • Зручно</p>
                </div>
            </header>

            <main className={styles.container}>
                {train ? (
                    <div className={styles.contentCenter}>
                        <WagonSelector 
                            wagons={wagons} 
                            onSelectWagon={setSelectedWagon} 
                            selectedWagonId={selectedWagon?.id}
                        />

                        {selectedWagon && (
                            <div className={styles.seatMapSection}>
                                <SeatMap wagon={selectedWagon} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.loading}>
                        <p>Завантаження інформації про рейс...</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Booking;