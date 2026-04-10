import TrainList from "../components/TrainList";
import styles from "./Home.module.css"; // Імпортуємо стилі

const Home = () => {
  return (
    <main className={styles.homePage}>
      <header className={styles.header}>
        <h1>Укрзалізниця</h1>
        <p>Бронювання квитків — швидко, надійно, зручно</p>
      </header>
      
      <section className={styles.mainContent}>
        <TrainList />
      </section>
    </main>
  );
};

export default Home;