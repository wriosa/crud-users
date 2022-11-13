import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import UserList from './components/UserList';
import Swal from 'sweetalert2';

function App() {
  const [usersList, setUsersList] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => {
        setUsersList(res.data)
        Swal.fire('Users successfully loaded', '', 'success')
      })
      .catch(error => Swal.fire(error.response?.data, '', 'error'));
  }, [])

  const getUsers = () => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsersList(res.data))
  }
  const selectUser = (user) => {
    setUserSelected(user)
  }
  const desSelectUser = () => setUserSelected(null);

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => {
        getUsers(),
        Swal.fire('User deleted successfully', '', 'success')
      })
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Crud users</h1>
        <div className="user-wrapper">
          <UserForm getUsers={getUsers} userSelected={userSelected} desSelectUser={desSelectUser} />
          <UserList usersList={usersList} selectUser={selectUser} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App
