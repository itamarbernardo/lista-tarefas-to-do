import React from 'react'

import stlyes from './Modal.module.css'

type Props = {
    children: React.ReactNode //Estamos dizendo pro React que vamos usar JSX (HTML do React) dentro do children
}

//Modal para edicao
const Modal = ({children}: Props) => {
    const closeModal = (e: React.MouseEvent): void => {
        const modal = document.getElementById("modal");
        modal!.classList.add("hide"); //Modifico a classeName puxando do css global do index.css pra esconder o modal
    };
  
    return (
    <div id='modal' className='hide'>
        <div className={stlyes.fade} onClick={closeModal}></div>
        <div className={stlyes.modal}>
            <h1>Texto modal</h1>
            {children}
        </div>
    </div>
  )
}

export default Modal