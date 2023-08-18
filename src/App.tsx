import React, { useState } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';

import styles from './App.module.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

//Interface
import { ITask } from './interfaces/ITask';
import Modal from './components/Modal';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]) //É um array contendo elementos ITask
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
 
  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id //Retorna todos menos o que é pra ser excluído e já altera a lista com o setTaskList
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById("modal"); //Como eu tenho o id no elemento, posso pegar ele onde eu quiser, até mesmo em outra página
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task; //se achar a task, atualiza ela pela nova task, se não achar, retorna a antiga
    });
    
    setTaskList(updatedItems);

    hideOrShowModal(false);
  };

  return (
    <div>
      <Modal children={<TaskForm btnText='Editar' taskList={taskList}  task={taskToUpdate} handleUpdate={updateTask}/>} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Criar Tarefa' taskList={taskList} setTaskList={setTaskList} />
        </div>
        <div>
          <h2>Lista de tarefas</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
