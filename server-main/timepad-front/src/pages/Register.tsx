import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { User } from '../types/FormData';
import { url } from "../utils/api";
import Header from '../components/Header';
const Register: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<User>();

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [accData, setAccData] = useState<string | null>(null);

    useEffect(() => {
        // Check for the token in local storage when the component loads
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            navigate('/'); // Redirect to /admin if the token is found
        }
    }, [navigate]);

    const fetchData = async (token: string) => {
        try {
            const response = await axios.get(`${url}/api/token/`, {
                headers: {
                    token: token
                }
            });
            setAccData(response.data);
            console.log(response.data);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('login', response.data.login);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit: (data: User) => Promise<void> = async (data: User) => {
        try {
        const response = await axios.post(
        `${url}/api/register/`,
        {
        login: data.username,
        password: data.password,
        role: 'user'
        },
        {
        headers: {
        'Content-Type': 'application/json'
        // Добавьте заголовок Authorization, если требуется аутентификация
        // 'Authorization': `Bearer ${yourAccessToken}`
        }
        }
        );
        
        if (response.status === 200) {
        localStorage.setItem('token', response.data.user);
        localStorage.setItem('login', response.data.user);
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
        fetchData(storedToken);
        navigate('/');
        }
        }
        } catch (error) {
        console.error('Authentication error', error);
        setError('Authentication failed');
        }
        };

    return (
        <div className="form">
            <Header />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Регистрация</h3>
                <div>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Username is required' }}
                        render={({ field }: { field: FieldValues }) => (
                            <TextField {...field} label="Логин" variant="outlined" fullWidth />
                        )}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>
                <br />
                <div>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required' }}
                        render={({ field }: { field: FieldValues }) => (
                            <TextField
                                {...field}
                                label="Пароль"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <br />
                <Button type="submit" variant="contained" color="primary">
                    Зарегистрироваться
                </Button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
