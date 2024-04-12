import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const Header: React.FC = () => {
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.clear();
    navigate('/register');
    };
    return (
        <AppBar color='secondary' position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button color="inherit" href="/">
                        Blog
                    </Button>
                    {token ? (
                        <>
                        <Button color="inherit" href="/addevent">
                            Добавить статью
                        </Button>
                        <Button color="inherit" >
                            {login}
                        </Button>
                        <a onClick={() => handleLogout()}>Выйти</a>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" href="/login">
                                Войти
                            </Button>
                            <Button color="inherit" href="/register">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
