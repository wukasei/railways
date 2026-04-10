import { WAGON_TYPES } from '../data/trains';
import styles from './WagonSelector.module.css';

const WagonSelector = ({ wagons, onSelectWagon, activeWagonId }) => {
    if (!wagons || wagons.length === 0) {
        return <div className={styles.loading}>Завантаження вагонів...</div>;
    }

    return (
        <div className={styles.wagonSelector}>
            <h3>Оберіть вагон:</h3>
            <div className={styles.wagonGrid}>
                {wagons.map(wagon => (
                    <button 
                        key={wagon.id} 
                        type="button"
                        onClick={() => onSelectWagon(wagon)}
                        className={`${styles.wagonBtn} ${activeWagonId === wagon.id ? styles.active : ''}`}
                    >
                        <span className={styles.number}>Вагон №{wagon.number}</span>
                        <span className={styles.type}>
                            {wagon.type === WAGON_TYPES.LUX ? '🌟 ' : ''} 
                            {wagon.type}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WagonSelector;