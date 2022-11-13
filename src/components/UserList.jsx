import React from 'react';

const UserList = ({ usersList, selectUser, deleteUser }) => {
    return (
        <div className="list-form">
            <h2>Users</h2>
            {
                usersList.map(user => (
                    <ul key={user.id}>
                        <li >
                            <div className="information">
                                <h4><i className="fa-solid fa-circle-user"></i> <b>Name: </b>{user.first_name} {user.last_name}</h4>
                                <div><i className="fa-solid fa-envelope"></i> <b>Email: </b>{user.email}</div>
                                {/* <div><i class="fa-solid fa-envelope"></i> <b>Password: </b>wol5643</div> */}
                                <div><i className="fa-solid fa-cake-candles"></i> <b>Birthday: </b>{user.birthday}</div>
                            </div>
                            <div className="buttons">
                                <button onClick={() =>selectUser(user)}><i className="fa-solid fa-pen-to-square"></i></button>
                                <button onClick={()=> deleteUser(user.id)}><i className="fa-solid fa-trash-can"></i></button>
                            </div>
                        </li>
                    </ul>
                ))
            }

        </div>
    );
};

export default UserList;