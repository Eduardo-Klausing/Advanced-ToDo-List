import { useNavigate, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';
import { TextField, Stack, FormControl, InputLabel, Select, MenuItem, Avatar, Button } from '@mui/material';
import { Users } from '/imports/api/users'; // Verifique se este caminho está correto

export const Perfil = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // Obtém o userId da URL

    // --- DEBUG: Log do userId da URL ---
    console.log('CLIENTE: userId obtido da URL:', userId);

    const isReady = useTracker(() => {
        // Assina a publicação 'usersProfile', passando o userId
        const handle = Meteor.subscribe('usersProfile', userId);
        // --- DEBUG: Log do status da assinatura ---
        console.log('CLIENTE: Assinatura usersProfile está pronta?', handle.ready());
        return handle.ready();
    }, [userId]);

    const user = useTracker(() => {
        if (!isReady) {
            // --- DEBUG: Log se a assinatura não está pronta ---
            console.log('CLIENTE: Assinatura não está pronta, user é null.');
            return null;
        }
        // Tenta encontrar o usuário na coleção local (Minimongo)
        const foundUser = Users.findOne(userId);
        // --- DEBUG: Log do usuário encontrado no Minimongo ---
        console.log('CLIENTE: Usuário encontrado no Minimongo:', foundUser);
        return foundUser;
    }, [isReady, userId]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [company, setCompany] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        // Este useEffect só é executado quando o objeto 'user' muda
        if (user) {
            // --- DEBUG: Populando estados com dados do usuário ---
            console.log('CLIENTE: Populando formulário com dados do usuário:', user);
            setName(user.name || '');
            setEmail(user.email || '');
            setBirthDate(user.birthDate || '');
            setGender(user.gender || '');
            setCompany(user.company || '');
            setPhoto(user.photo || '');
        } else {
            // --- DEBUG: Usuário não encontrado ou null, limpando formulário ---
            console.log('CLIENTE: Usuário é null ou undefined, limpando campos do formulário.');
            setName('');
            setEmail('');
            setBirthDate('');
            setGender('');
            setCompany('');
            setPhoto('');
        }
    }, [user]); // Dependência no objeto 'user'

    const handleSubmit = (e) => {
        e.preventDefault();

        // --- DEBUG: Dados que serão enviados para o servidor ---
        console.log('CLIENTE: Enviando dados para usersProfile.update:', {
            userId,
            name,
            email,
            birthDate,
            gender,
            company,
            photo,
        });

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

    return (
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
    );
};
