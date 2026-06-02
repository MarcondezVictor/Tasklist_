'use client'

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import AddToTaskListComponent from "@/app/lista/AddToTaskListComponent";
import TaskListItemComponent from "@/app/lista/TaskListItemComponent";
import {createTarefa, fetchLista} from "@/api/api";

export default function Lista() {

    const [inputTexto, setInputTexto] = useState("");
    const [lista, setLista] = useState([]);

    const getTarefasFromServidor = async () => {
        let dadosDoServidor = await fetchLista();
        setLista(dadosDoServidor.data);   // <-- Tarefa 2, ponto 1.1
    }

    useEffect(() => {
        async function carregarDados() {
            try {
                await getTarefasFromServidor();
            } catch (err) {
                alert("Erro a buscar lista de tarefas do servidor");
                console.log(err);
            }
        }
        carregarDados();
    }, []);

    const handleButtonClick = async () => {
        if (inputTexto != null && inputTexto !== "") {
            try {
                let resposta = await createTarefa(inputTexto);
                if (resposta) {
                    alert("A tarefa foi inserida com sucesso");
                    await getTarefasFromServidor();
                } else {
                    alert("A tarefa não foi inserida");
                }
            } catch (err) {
                alert("Erro a inserir tarefa no servidor");
                console.log(err);
            }
        }
    }

    const handleDeleteTask = (idTask) => {
        var copiaLista = [...lista];
        copiaLista.splice(idTask, 1);
        setLista(copiaLista);
    }

    const handleEditTask = (idTask, taskValue) => {
        var copiaLista = [...lista];
        copiaLista[idTask] = taskValue;
        setLista(copiaLista);
    }

    return (
        <div>
            <main className={styles.main}>
                <h2 className={styles.titulo}>Lista de tarefas</h2>
                <p className={styles.subtitulo}>Escreve no input a tarefa que queres realizar</p>
                <div className={styles.card}>
                    <AddToTaskListComponent
                        inputTextoParam={inputTexto}
                        setInputTextoParam={setInputTexto}
                        handleButtonClickParam={handleButtonClick}
                    />
                </div>
                <br/>
                <div className={styles.displayFlex}>
                    {lista.map((valor, indice) => {
                        return <TaskListItemComponent
                            key={indice}
                            indice={indice}
                            valor={valor}
                            handleDeleteTask={handleDeleteTask}
                            handleEditTask={handleEditTask}
                        />;
                    })}
                </div>
            </main>
        </div>
    )};