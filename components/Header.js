import styles from "@/styles/Header.module.css";

export default function Header({ account }) {
  return (
    <header className={styles.header}>
      <h1>Ethereum Account Dashboard</h1>
      <h1>Account Connected: {account}</h1>
    </header>
  );
}
