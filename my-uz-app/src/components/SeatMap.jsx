import { useState, useEffect } from 'react';
import BookingForm from './BookingForm'; 
import BookingService from '../services/BookingService'; 
import { useBooking } from '../context/BookingContext';
import styles from './SeatMap.module.css';

const SeatMap = ({ wagon }) => {
    const { myBookings } = useBooking(); 
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serverBookedSeats, setServerBookedSeats] = useState([]); 

    const updateBookedSeats = async () => {
        try {
            const allBookings = await BookingService.getAllBookings();
            const occupied = allBookings
                .filter(b => b.wagonId === wagon.id)
                .flatMap(b => b.seats);
            setServerBookedSeats(occupied);
        } catch (error) {
            console.error("Помилка завантаження бронювань:", error);
        }
    };

    useEffect(() => {
        setSelectedSeats([]);
        setIsModalOpen(false);
        if (wagon?.id) {
            updateBookedSeats();
        }
    }, [wagon.id]);

    const seats = Array.from({ length: wagon.capacity || 32 }, (_, i) => i + 1);

    const toggleSeat = (num) => {
        if (selectedSeats.includes(num)) {
            setSelectedSeats(selectedSeats.filter(s => s !== num));
        } else {
            setSelectedSeats([...selectedSeats, num]);
        }
    };

    return (
        <div className={styles.container}>
            <h3>Схема вагона №{wagon.number} ({wagon.type})</h3>
            
            <div className={styles.grid}>
                {seats.map(num => {
                    const isBooked = 
                        wagon.bookedSeats?.includes(num) || 
                        serverBookedSeats.includes(num) ||
                        myBookings.filter(b => b.wagonId === wagon.id).flatMap(b => b.seats).includes(num);

                    const isSelected = selectedSeats.includes(num);

                    return (
                        <button
                            key={num}
                            disabled={isBooked}
                            className={`${styles.seat} ${isSelected ? styles.selected : ''} ${isBooked ? styles.booked : ''}`}
                            onClick={() => toggleSeat(num)}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>

            {selectedSeats.length > 0 && (
                <div className={styles.bookingActions}>
                    <p>Обрано місць: <strong>{selectedSeats.length}</strong> ({selectedSeats.join(', ')})</p>
                    <button className={styles.bookButton} onClick={() => setIsModalOpen(true)}>
                        Забронювати
                    </button>
                </div>
            )}

            {isModalOpen && (
                <BookingForm 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    wagon={wagon} 
                    selectedSeats={selectedSeats} 
                    onSuccess={() => {
                        setIsModalOpen(false);
                        setSelectedSeats([]);
                        updateBookedSeats(); 
                    }} 
                />
            )}
        </div>
    );
};

export default SeatMap;