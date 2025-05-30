import { useNavigate, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';
import { TextField, Stack, FormControl, InputLabel, Select, MenuItem, Avatar, Button } from '@mui/material';
import { Users } from '/imports/api/users'

export const Perfil = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const isReady = useTracker(() => {
        const handle = Meteor.subscribe('usersProfile', userId);
        return handle.ready();
    }, [userId])

    const user = useTracker(() => {
        if(!isReady) return null;
        return Users.findOne(userId);
    }, [isReady, userId]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [company, setCompany] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        if(user){
            setName(user.name || '');
            setEmail(user.email || '');
            setBirthDate(user.birthDate || '');
            setGender(user.gender || '');
            setCompany(user.company || '');
            setPhoto(user.photo || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Meteor.call(
            'usersProfile.update',
            userId,
            {
                name,
                email,
                birthDate,
                gender,
                company,
                photo,
            },
            (err) => {
                if(err){
                console.error('Erro ao atualizar tarefa:', err);                
                } else {
                navigate('/tasks');
                }
            }
        );
    };

    return(
    <Stack spacing={2}>
        <h1>Perfil de usuário</h1>

        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
            <Avatar
                src={photo}
                alt="Foto do usuário"
                sx={{ width: 100, height: 100 }}
            />

            <TextField
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Data de Nascimento"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <FormControl>
                <InputLabel>Gênero</InputLabel>
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                </Select>
            </FormControl>


            <TextField
                label="Empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <Button variant="contained" type="submit">
                Salvar
            </Button>
            
            </Stack>
        </form>
    </Stack>
    );
};