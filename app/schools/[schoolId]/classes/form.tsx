import { Box, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, HStack, Heading, Input, InputField, Spinner, VStack } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useStore } from '../../../../store/useStore';

const shifts = ['Manhã', 'Tarde', 'Noite'] as const;

export default function ClassFormScreen() {
  const { schoolId, id } = useLocalSearchParams();
  const { classes, addClass, updateClass } = useStore();
  const [name, setName] = useState('');
  const [shift, setShift] = useState<'Manhã' | 'Tarde' | 'Noite'>('Manhã');
  const [year, setYear] = useState('2025');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const classItem = classes.find((c) => c.id === id);
      if (classItem) {
        setName(classItem.name);
        setShift(classItem.shift);
        setYear(classItem.year);
      }
    }
  }, [id, classes]);

  const handleSave = async () => {
    if (!name.trim() || !year.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setSaving(true);
      if (id) {
        const response = await fetch(`/api/classes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, shift, year }),
        });
        const data = await response.json();
        updateClass(id as string, data.class);
      } else {
        const response = await fetch('/api/classes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: Date.now().toString(),
            schoolId,
            name,
            shift,
            year,
          }),
        });
        const data = await response.json();
        addClass(data.class);
      }
      router.back();
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
      Alert.alert('Erro', 'Não foi possível salvar a turma');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '$coolGray50' }}>
      <Box p="$4">
        <VStack space="xl">
          <Heading size="2xl" color="$coolGray800">
            {id ? 'Editar Turma' : 'Nova Turma'}
          </Heading>
          
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText fontSize="$md" fontWeight="$semibold">
                Nome da Turma *
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Ex: 5º Ano A"
                value={name}
                onChangeText={setName}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText fontSize="$md" fontWeight="$semibold">
                Turno *
              </FormControlLabelText>
            </FormControlLabel>
            <HStack space="xs">
              {shifts.map((s) => (
                <Button
                  key={s}
                  flex={1}
                  variant={shift === s ? 'solid' : 'outline'}
                  bg={shift === s ? '$blue600' : '$white'}
                  borderColor="$coolGray300"
                  onPress={() => setShift(s)}
                >
                  <ButtonText 
                    color={shift === s ? '$white' : '$coolGray700'}
                    fontSize="$sm"
                    fontWeight="$semibold"
                  >
                    {s}
                  </ButtonText>
                </Button>
              ))}
            </HStack>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText fontSize="$md" fontWeight="$semibold">
                Ano Letivo *
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="lg">
              <InputField
                placeholder="Ex: 2025"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <Button bg="$blue600" size="lg" onPress={handleSave} isDisabled={saving}>
            {saving ? (
              <Spinner color="$white" />
            ) : (
              <ButtonText fontSize="$md" fontWeight="$bold">
                Salvar
              </ButtonText>
            )}
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            borderColor="$coolGray300"
            onPress={() => router.back()}
            mb="$6"
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


