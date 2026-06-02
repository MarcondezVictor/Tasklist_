import styles from "./page.module.css";

export default function TaskListItemComponent({ indice, valor, handleDeleteTask, handleEditTask }) {
    return (
        <div className={styles.itemLista}>
            <p className={styles.itemTexto}>{valor.DescricaoTarefa + valor.Concluida}</p>
            <div className={styles.itemBotoes}>
                <button onClick={() => {
                    var res = prompt("Insira o valor para atualizar");
                    if (res != null && res !== "") {
                        handleEditTask(indice, res);
                    }
                }}>✍️</button>
                <button onClick={() => {
                    handleDeleteTask(indice);
                }}>❌</button>
            </div>
        </div>
    );
}