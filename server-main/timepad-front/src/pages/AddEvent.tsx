import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import Header from "../components/Header";
import {url} from '../utils/api'
import {EventData} from "../types/AddEvent";
import {useNavigate} from "react-router-dom";

export const AddEvent: React.FC = () => {
    const navigate = useNavigate()
    const [eventData, setEventData] = useState<EventData>({
      title:'',
        body:'',
        created_at:'',
        user_id:0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Отправка данных на сервер
            await axios.post(`${url}/api/post`, eventData);
            navigate('/')
            // Успешно отправлено
            console.log("Данные успешно отправлены:", eventData);
        } catch (error) {
            console.error("Ошибка отправки данных:", error);
        }
    };

    return (
        <>
            <Header/>
            <br/>
        <form onSubmit={handleSubmit}>
            <TextField
                name="title"
                label="Название"
                value={eventData.title}
                onChange={handleChange}
                required
            />  <br/>  <br/>
            <TextField
                name="body"
                label="Описание"
                value={eventData.body}
                onChange={handleChange}
                required
            />  <br/>  <br/>

            <TextField
                name="created_at"
                label="Дата"
                type="date"
                value={eventData.created_at}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
            />  <br/>  <br/>


            <Button type="submit" variant="contained" color="primary">
                Создать событие
            </Button>
        </form>
        </>
    );
};

export default AddEvent;
