import { useNavigate, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';
import { TextField, Stack, FormControl, InputLabel, Select, MenuItem, Avatar, Button } from '@mui/material';
import { Users } from '/imports/api/users'; 
import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export const Perfil = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); 

    const isReady = useTracker(() => {
        // Assina a publicação 'usersProfile', passando o userId
        const handle = Meteor.subscribe('usersProfile', userId);
        return handle.ready();
    }, [userId]);

    const user = useTracker(() => {
        if (!isReady) {
            return null;
        }
        const foundUser = Users.findOne(userId);
        return foundUser;
    }, [isReady, userId]);

    const currentUserId = useTracker(() => {
        return Meteor.userId();
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [company, setCompany] = useState('');
    const [photo, setPhoto] = useState('');
    const [open, setOpen] = React.useState(false);
    
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        // Este useEffect só é executado quando o objeto 'user' muda
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setBirthDate(user.birthDate || '');
            setGender(user.gender || '');
            setCompany(user.company || '');
            setPhoto(user.photo || '');
        } else {
            setName('');
            setEmail('');
            setBirthDate('');
            setGender('');
            setCompany('');
            setPhoto('');
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
                if (err) {
                    console.error('CLIENTE: Erro ao atualizar perfil:', err);
                } else {
                    console.log('CLIENTE: Perfil atualizado com sucesso!');
                    navigate('/tasks');
                }
            }
        );
    };

    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="/tasks">
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Tarefas"/>
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to={`/perfil/${currentUserId}`}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Editar Perfil"/>
            </ListItemButton>
            </ListItem>
        </List>
    </Box>
    );

    return (
        <div>        
            <Button onClick={toggleDrawer(true)}>
            <MenuIcon />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
            </Drawer>
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
                            // Adicione type="date" para um seletor de data adequado
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            // Garante que o label não se sobreponha à data
                            InputLabelProps={{ shrink: true }} 
                        />
                        <FormControl>
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label="Gênero" // Importante para o FormControl
                            >
                                <MenuItem value=""><em>Nenhum</em></MenuItem> {/* Opção vazia */}
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Campo para a URL da foto, se aplicável */}
                        <TextField
                            label="URL da Foto"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />

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
        </div>   
    );
};
