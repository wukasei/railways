import styles from './TrainCard.module.css';

const TrainCard = ({ train }) => {
    // Твоя функція для форматування
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.trainNumber}>№ {train.number}</span>
                <span className={styles.duration}>{train.duration} в дорозі</span>
            </div>
            
            <div className={styles.route}>
                <h3>{train.from} → {train.to}</h3>
            </div>
            
            <div className={styles.footer}>
                <div className={styles.departureInfo}>
                    <p className={styles.departureTime}>
                        Відправлення: <br />
                        <strong>{formatDate(train.departure)}</strong>
                    </p>
                    {/* Додаємо порожній div для відступу або просто клас з margin */}
                    <div style={{ marginBottom: '10px' }}></div> 
                    <p className={styles.departureTime}>
                        Прибуття: <br />
                        <strong>{formatDate(train.arrival)}</strong>
                    </p>
                </div>
                <button className={styles.bookingBtn}>
                    Вибрати місця
                </button>
            </div>
        </div>
    );
}

export default TrainCard;