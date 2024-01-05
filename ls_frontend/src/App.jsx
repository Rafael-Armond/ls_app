import { useState, useEffect, useRef } from 'react';
import { UserCard } from './components/userCard/userCard';
import { CustomButton } from './components/button/customButton';
import { GlobalStyles } from './App.style';

function App() {
  const [users, setUsers] = useState([]);
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchRandomUsers();
    }
  }, []);

  const fetchRandomUsers = async () => {
    try {
      const response = await fetch('https://random-data-api.com/api/v2/users?size=100');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const registerAllUsers = async () => {
    try {
      const usersToRegister = [];
      users.forEach((user) => {
        const data = {
          id: user.id,
          uid: user.uid,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          gender: user.gender,
          phone_number: user.phone_number,
          social_insurance_number: user.social_insurance_number,
          date_of_birth: user.date_of_birth,
          register: true
        };
        usersToRegister.push(data);
      });
      await fetch('http://localhost:3333/users/create',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usersToRegister),
        }
      );
    } catch (err) {
      console.error("Erro: ", err);
    }
  }

  const getRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:3333/users/getAll');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro: ", err);
    }
  }

  return (
    <>
      <GlobalStyles />
      <CustomButton
        text="Carregar usuários aleatórios"
        onClick={fetchRandomUsers}
      />
      <CustomButton
        text="Carregar usuários cadastrados"
        onClick={getRegisteredUsers}
      />
      <CustomButton
        text="Cadastrar todos"
        color="#00FA9A"
        onClick={registerAllUsers}
      />
      {users.map((user, index) => (
        <UserCard
          key={index}
          id={user.id}
          first_name={user.first_name}
          last_name={user.last_name}
          avatar={user.avatar}
          email={user.email}
          registered={user.register ?? false}
          uid={user.uid}
          password={user.password}
          username={user.username}
          gender={user.gender}
          phone_number={user.phone_number}
          social_insurance_number={user.social_insurance_number}
          date_of_birth={user.date_of_birth}
        />
      ))}
    </>
  )
}

export default App
