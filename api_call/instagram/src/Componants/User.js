import React, { useEffect, useState } from 'react';
import './Css/User.css';
import * as rv from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = () => {
    const [userVal, setUserVal] = useState([]);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(function (response) {
                setUserVal(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="user-container">
            <rv.Container fluid className="user-content">
                    
                <div className="user-row">
                    {userVal.map((info, index) => (
                        <rv.Col className="profile-main" key={index}>
                            <Link to={`/Profile/${info.id}/${info.name}`} className="text-decoration-none">
                                <div className="profile">
                                    <div className="profile-images">
                                        <img src={require(`../image/profile${index + 1}.jpg`)} alt="" />
                                    </div>
                                    <div className="profile-details">
                                        <h5 className="username">{info.name}</h5>
                                        <p className="user-info">@{info.username}</p>
                                    </div>
                                </div>
                            </Link>
                            </rv.Col>
                    ))}
                </div>
                   
            </rv.Container>
        </div>
    );
};

export default User;
