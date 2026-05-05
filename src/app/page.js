'use client';

import styles from "./page.module.css";
import {useState} from "react";

export default function Home() {
    // variável de estado
    const [name, setName] = useState("mundo!");

    // função
    const alterName =
        () => { setName("mundo!")}

    return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Olá {name}</h2>

          <button style={{width: '100px', fontSize: '16px'}} onClick={
              () => {setName("MUNDO!!!!")}
          }>
              Clica em mim ;)
          </button>

          <button style={{width: '100px', fontSize: '16px'}} onClick={alterName}>
              Clica em mim antes :D
          </button>
      </main>
    </div>
  );
}
