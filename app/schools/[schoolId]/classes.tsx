import { Box, Button, ButtonText, HStack, Heading, Text, VStack } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useStore } from '../../../store/useStore';
import { Class, School } from '../../../types';

export default function ClassesScreen() {
  const { schoolId } = useLocalSearchParams();
  const { schools, classes, setClasses, deleteClass } = useStore();
  const [school, setSchool] = useState<School | null>(null);
  const [schoolClasses, setSchoolClasses] = useState<Class[]>([]);

  useEffect(() => {
    const foundSchool = schools.find((s) => s.id === schoolId);
    setSchool(foundSchool || null);
    loadClasses();
  }, [schoolId, schools]);

  useEffect(() => {
    const filtered = classes.filter((c) => c.schoolId === schoolId);
    setSchoolClasses(filtered);
  }, [classes, schoolId]);

  const loadClasses = async () => {
    try {
      const response = await fetch(`/api/classes?schoolId=${schoolId}`);
      const data = await response.json();
      setClasses(data.classes);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    }
  };

  const handleDelete = (classItem: Class) => {
    Alert.alert(
      'Excluir Turma',
      `Deseja realmente excluir ${classItem.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`/api/classes/${classItem.id}`, { method: 'DELETE' });
              deleteClass(classItem.id);
            } catch (error) {
              console.error('Erro ao excluir turma:', error);
            }
          },
        },
      ]
    );
  };

  const renderClass = ({ item }: { item: Class }) => (
    <Box
      bg="$white"
      borderRadius="$xl"
      p="$4"
      mb="$3"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      elevation={3}
    >
      <VStack space="md">
        <Box>
          <Text fontSize="$lg" fontWeight="$bold" color="$coolGray800" mb="$2">
            {item.name}
          </Text>
          <Text fontSize="$sm" color="$coolGray600" mb="$1">
            Turno: {item.shift}
          </Text>
          <Text fontSize="$sm" color="$coolGray600">
            Ano Letivo: {item.year}
          </Text>
        </Box>
        <HStack space="xs">
          <Button
            flex={1}
            bg="$green600"
            onPress={() => router.push(`/schools/${schoolId}/classes/form?id=${item.id}`)}
            size="sm"
          >
            <ButtonText>Editar</ButtonText>
          </Button>
          <Button
            flex={1}
            bg="$red600"
            onPress={() => handleDelete(item)}
            size="sm"
          >
            <ButtonText>Excluir</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <Box flex={1} bg="$coolGray50">
      <Box bg="$white" p="$4" borderBottomWidth={1} borderBottomColor="$coolGray200">
        <VStack space="md">
          <Heading size="xl" color="$coolGray800">
            Turmas - {school?.name}
          </Heading>
          <Button bg="$blue600" onPress={() => router.push(`/schools/${schoolId}/classes/form`)}>
            <ButtonText fontSize="$md" fontWeight="$bold">
              + Adicionar Turma
            </ButtonText>
          </Button>
        </VStack>
      </Box>
      {schoolClasses.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text fontSize="$md" color="$coolGray400">
            Nenhuma turma cadastrada
          </Text>
        </Box>
      ) : (
        <FlatList
          data={schoolClasses}
          renderItem={renderClass}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </Box>
  );
}
