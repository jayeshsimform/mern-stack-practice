import React from 'react';
import UserItem from './UserItem';
import './UserItem.css'
const UserList = (props) => {
    if (props?.items?.length === 0) {
        return (
            <div className='center'>
                <h2>No users found</h2>
            </div>
        );
    }
    return <ul className='users-list'>
        {
            props?.items?.map(user =>
                <UserItem
                    key={user?.id}
                    id={user?.id}
                    name={user?.name}
                    image={user?.image}
                    placeCount={user?.places} />
            )
        }
    </ul>

}

export default UserList;