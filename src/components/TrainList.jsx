import { useEffect, useState } from "react";
import TrainCard from "./TrainCard";
import axios from "axios";
import styles from "./TrainList.module.css";
import { API_URL } from '../data/trains';

function TrainList(){
    const [trains, setTrains] = useState([]);
    const [searchItem, setSearchItem] = useState("")

    useEffect(() => {
        axios.get(`${API_URL}/trains`)
            .then(response => {
                setTrains(response.data)
            })
            .catch(err => console.error("Помилка завантаження:", err))
    }, [])

    const filteredTrains = trains.filter(train => {
        const search = searchItem.toLowerCase();
        const fromMatch = train.from.toLowerCase().includes(search);
        const toBeMatch = train.to.toLowerCase().includes(search);
        const numberMatch = train.number.toLowerCase().includes(search);
        return fromMatch || toBeMatch || numberMatch;
    })

    return (
        <div className={styles.container}>
            <input 
                type="text"
                placeholder="Куди їдемо? (напр. Львів)"
                className={styles.searchInput}
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
            <div className={styles.listGrid}>
                {filteredTrains.length > 0 ? (
                    filteredTrains.map(train => (
                        <TrainCard key={train.id} train={train} />
                    ))
                ) : (
                    <p className={styles.noResults}>Потягів не знайдено :(</p>
                )}
            </div>
        </div>
    );
}

export default TrainList;