import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from "../utils/api";
import { EventType } from "../types/EventType";
import Header from "../components/Header";

const Event = () => {
    const navigate = useNavigate();
    const { event_id } = useParams();
    const [event, setEvent] = useState<EventType | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<EventType>(`${url}/api/post/${event_id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchEvent();
    }, [event_id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header/>
            <h2>{event.title}</h2>
            <p>{event.body}</p>
            <p>Date: {new Date(event.created_at).toLocaleDateString()}</p>
        </>
    );
};

export default Event;
