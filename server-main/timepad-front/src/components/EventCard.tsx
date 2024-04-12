import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {url} from "../utils/api";
import {EventType} from "../types/EventType";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
const EventCard: React.FC = () => {
    const token = localStorage.getItem('token');
    const [events, setEvents] = useState<EventType[]>([]);
    const user = localStorage.getItem('id')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<EventType[]>(`${url}/api/post`);
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async(id:number)=>{
        try {
              axios.delete(`${url}/api/post/${id}`)
        }catch (e) {
            console.error(e)
        }
    }

    // const handleRegister = async(user_id:number,event_id:number)=>{
    //     try {
    //         axios.put(`${url}/api/events/${event_id}/register/${user_id}`)
    //         alert(`Вы успешно зарегистрированны на мероприятие`)
    //     }catch (e) {
    //         console.error(e)
    //     }
    // }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px',justifyContent:'center',alignItems:'center' }}>
            {events.map((event) => (
                
                <Card key={event.id} sx={{ maxWidth: 345 }}>
                    {token ? (
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.body}
                        </Typography>
                       
                        <Typography variant="body2" color="text.secondary">
                            Date: {new Date(event.created_at).toLocaleDateString()}
                        </Typography>
                      <Link to={`event/${event.id}`}> <Button color='secondary' variant='contained'>Подробнее</Button></Link> <br/><br/>

                        <Button onClick={() => handleDelete(event.id)} color='secondary' variant='contained'>Удалить</Button><br/><br/>

                    </CardContent>) : (
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {event.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.body}
                            </Typography>
                           
                            <Typography variant="body2" color="text.secondary">
                                Date: {new Date(event.created_at).toLocaleDateString()}
                            </Typography>
                          <Link to={`event/${event.id}`}> <Button color='secondary' variant='contained'>Подробнее</Button></Link> <br/><br/>

    
                        </CardContent>
                        )}
                </Card>
            ))}
        </div>
    );
};

export default EventCard;
