import { Box, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, Heading, Input, InputField, VStack } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';

export default function SchoolFormScreen() {
  const { id } = useLocalSearchParams();
  const { schools, addSchool, updateSchool } = useStore();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (id) {
      const school = schools.find((s) => s.id === id);
      if (school) {
        setName(school.name);
        setAddress(school.address);
      }
    }
  }, [id, schools]);

  const handleSave = async () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (id) {
        const response = await fetch(`/api/schools/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, address }),
        });
        const data = await response.json();
        updateSchool(id as string, data.school);
      } else {
        const response = await fetch('/api/schools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: Date.now().toString(),
            name,
            address,
          }),
        });
        const data = await response.json();
        addSchool(data.school);
      }
      router.back();
    } catch (error) {
      console.error('Erro ao salvar escola:', error);
      Alert.alert('Erro', 'Não foi possível salvar a escola');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '$coolGray50' }}>
      <Box p="$4">
        <VStack space="xl">
          <Heading size="2xl" color="$coolGray800">
            {id ? 'Editar Escola' : 'Nova Escola'}
          </Heading>
          
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText fontSize="$md" fontWeight="$semibold">
                Nome da Escola *
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Digite o nome da escola"
                value={name}
                onChangeText={setName}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText fontSize="$md" fontWeight="$semibold">
                Endereço *
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Digite o endereço"
                value={address}
                onChangeText={setAddress}
              />
            </Input>
          </FormControl>

          <Button bg="$blue600" size="lg" onPress={handleSave}>
            <ButtonText fontSize="$md" fontWeight="$bold">
              Salvar
            </ButtonText>
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            borderColor="$coolGray300"
            onPress={() => router.back()}
          >
            <ButtonText color="$coolGray700" fontSize="$md" fontWeight="$semibold">
              Cancelar
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}
