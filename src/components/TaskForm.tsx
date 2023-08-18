import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'

import styles from './TaskForm.module.css'

//Interface
import { ITask } from '../interfaces/ITask';

type Props = {
    btnText: string
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>> // (props opcional com o simbolo ?) Estamos dizendo ao react que a gente vai tá alterando o state de uma lista
    task?: ITask | null //A task pode ser desses dois tipos
    handleUpdate?(id: number, title: string, difficulty: number): void //retorna null
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDificulty] = useState<number>(0)

    useEffect(() => {
        //Preencher o form com os dados da task para edição
        if(task){ //se a task for diff de null
            setId(task.id)
            setTitle(task.title)
            setDificulty(task.difficulty)
        }
    }, [task]) //Sempre que a task for atualizada, o useEffect executa

    const addOrUpdateTaskHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(handleUpdate){ //Se o método está vindo, é porque eu quero atualizar
            handleUpdate(id, title, difficulty)    
        }
        else{

            //Add a Task no Array de Tasks        
            const id = Math.floor(Math.random() * 1000) //Pega um numero aleatorio e arredonda pra baixo pra ficar inteiro para ser o id
    
            const newTask: ITask = {
                id, 
                title,
                difficulty
            }
    
            setTaskList!([...taskList, newTask]) //Add a nova task no array de tasks -  A ! diz ao Typescript que esse objeto setTaskList vem de certeza quando esse metodo é executado
    
    
            setTitle("")
            setDificulty(0)
    
            console.log(taskList)
        }

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.name == 'title'){
            setTitle(event.target.value)
        }else{
            //Eh o campo de dificuldade
            setDificulty(parseInt(event.target.value))
        }

        console.log(`Titile: ${title} e Dificuldade: ${difficulty}`)
    }

    return (
        <form onSubmit={addOrUpdateTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título:</label>
                <input
                type="text"
                name="title"
                placeholder="Título da tarefa"
                onChange={handleChange}
                value={title}
                />
        </div>
        <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade:</label>
                <input
                type="number"
                name="difficulty"
                placeholder="Dificuldade da tarefa (1 a 5)"
                onChange={handleChange}
                value={difficulty}                
                />
        </div>
        <input type="submit" value={btnText} />
        </form>
    )
}

export default TaskForm