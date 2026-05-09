import styles from './WagonSelector.module.css';

const WagonSelector = ({ wagons, onSelectWagon, selectedWagonId }) => {
    if (!wagons.length) return <div className={styles.loading}>Завантаження вагонів...</div>;

    return (
        <div className={styles.wagonSelector}>
            <h3>Оберіть вагон:</h3>
            <div className={styles.wagonGrid}>
                {wagons.map(wagon => (
                    <button 
                        key={wagon.id} 
                        className={`${styles.wagonBtn} ${selectedWagonId === wagon.id ? styles.active : ''}`}
                        onClick={() => onSelectWagon(wagon)}
                    >
                        <span className={styles.number}>№{wagon.number}</span>
                        <span className={styles.type}>{wagon.type}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WagonSelector;