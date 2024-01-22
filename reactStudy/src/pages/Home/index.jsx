import { useState,useEffect } from 'react';
// import React, { useState } frmo 'react'
import './style.css';

import {Card} from '../../components/Card';

// se usar o export direto na functiona precisa usar { Home } na importação
export function Home() {
  const [studentName, setStudentName ] = useState();// se colocar parametro dentro do useState é o valor que ele vai inicializar
  //imutabilidade
  const [studens, setStudenst] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" })

  function handleAddStudent() { // se não recebe parametros. só usar {handleAddStudent}
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudenst(prevState => [...prevState, newStudent]);//setStudenst([newStudent]); -> Muda apenas o estado e não adiciona outro, faça o teste
    // precisa usar ...
    // porque se não ele guarda um vetor dentro de outro vetor
    // exemplo
    // ['Rodrigo']
    // [['Rodrigo], Amanda]
  }

  useEffect(() => {
    // ações para executar - ele é executado automaticando assim que renderizar a tela
    fetch('https://api.github.com/users/caliansenai')
    //para usar uma async function, criar uma função dentro do use effect
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    });
    console.log("useEffect")
  },[]); //colocar no array algum estado, toda vez que o estado for executado, o useEffect também é . Ex: students

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença de Alunos</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input 
        type="text" 
        placeholder='Digite o seu nome..'
        onChange={e => setStudentName(e.target.value)}//setStudentName(e.target.value)
      />
      <button type='button' onClick={handleAddStudent}>
        Adicionar
      </button>
      {
        studens.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time} 
          />
        ))
      }
      <Card name="Rodrigo" time="10:55:25" />
    </div>
    /*
      {
        studens.map(student => <Card name={student.name} time={student.time} />)
      }

    forma errada de fazer
      <h1>Lista de Presença de Alunos</h1>
      <input type="text" placeholder='Digite o seu nome..'/>
      <button type='button'>Adicionar</button>

      * DEVE RETORNAR APENAS UM ELEMENTO - EXEMPLO: UMA DIV INTEIRA
      OU UM FRAGMENT
      <>
        <h1>Lista de Presença de Alunos</h1>
        <input type="text" placeholder='Digite o seu nome..'/>
        <button type='button'>Adicionar</button>
      </>

    */

  )
}

// Se usar assim usa o export normal na tela -- export default Home
