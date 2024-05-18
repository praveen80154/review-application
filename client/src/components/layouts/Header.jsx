import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Image, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import fetchProfile from '../../funtions/fetchProfile'; 

const Header = () => {
    const [user, setUser] = useState(null);
    const isAuthenticated = Cookies.get('token') ? true : false;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await fetchProfile();
                setUser(userProfile);
            } catch (error) {
                console.log(error);
            }
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/about">
                        <img src={"/images/logo.jpeg"} width="150" height="" alt="Review application" className="navbar-brand" />
                    </Link>
                    {isAuthenticated ? (
                        <div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#11navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarColor01">
                                <ul className="navbar-nav me-auto">
                                </ul>
                                <form className="d-flex">
                                    <input className="form-control me-sm-2" type="search" placeholder="Search" />
                                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                                </form>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ height: '40px', padding: '5px' }}>
                                        <Image
                                            src={'/images/image.png'}
                                            roundedCircle
                                            style={{ width: '30px', height: '30px', marginRight: '5px', marginLeft: '1px' }}
                                        />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/myprofile">Profile</Dropdown.Item>
                                        {user && user.role === 'Lecturer' && (
                                            <Dropdown.Item as={Link} to="/mycourses">My Courses</Dropdown.Item>
                                        )}
                                        <Dropdown.Item as={Button} onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Link className="btn btn-secondary my-2 my-sm-0 mx-1" to={"/login"}>Login</Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;
