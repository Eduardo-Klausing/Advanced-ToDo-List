import React from 'react';
import { TextField, Stack, FormControl, InputLabel, Select, MenuItem, Avatar, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const handleSubmit = () => {
    
}

export const Perfil = () => {
    return(
    <Stack spacing={2}>
        <h1>Perfil de usuário</h1>

        <TextField
            label="Nome"
        />

        <TextField
            label="Email"
        />

        <TextField
            label="Data de Nascimento"
        />

        <FormControl>
            <InputLabel>Gênero</InputLabel>
            <Select>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="Outro">Outro</MenuItem>
            </Select>
        </FormControl>


        <TextField
            label="Empresa"
        />

        <Button variant="contained" onClick={handleSubmit}>
            Salvar
        </Button>
    </Stack>
    );
};