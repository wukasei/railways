import { useEffect, useState } from "react";
import TrainCard from "./TrainCard";
import axios from "axios";
import styles from "./TrainList.module.css";

function TrainList(){
    const [trains, setTrains] = useState([]);
    const [searchItem, setSearchItem] = useState("")

    useEffect(() => {
        axios.get('http://localhost:3001/trains')
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
            {/* 2. Замінюємо інлайновий style на клас */}
            <input 
                type="text"
                placeholder="Куди їдемо? (напр. Львів)"
                className={styles.searchInput}
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />

            {/* 3. Додаємо клас для сітки */}
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