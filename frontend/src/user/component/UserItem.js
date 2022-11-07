import React from 'react';
import { Link } from 'react-router-dom'
import Avatar from '../../shared/component/UIElement/Avatar';
import Card from '../../shared/component/UIElement/Card';
import './UserList.css';

const UserItem = ({ id, name, placeCount, image }) => {
    return (
        <li className='user-item'>
            <Card className='user-item__content'>
                <Link to={`/${id}/places`}>
                    <div className='user-item__image'>
                        <Avatar name={name} image={process.env.REACT_APP_BACKEND_URL + '/' + image} />
                    </div>
                    <div className='user-item__info'>
                        <h2>{name}</h2>
                        <h3>{placeCount.length} {placeCount.length === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
}

export default UserItem;