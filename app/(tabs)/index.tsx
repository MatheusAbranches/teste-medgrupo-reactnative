import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Input,
  InputField,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useStore } from "../../store/useStore";
import { School } from "../../types";

export default function SchoolsScreen() {
  const { schools, setSchools, deleteSchool, classes, setClasses } = useStore();
  const [searchText, setSearchText] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchText) {
      const filtered = schools.filter(
        (school) =>
          school.name.toLowerCase().includes(searchText.toLowerCase()) ||
          school.address.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools);
    }
  }, [searchText, schools, classes]);

  const loadSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/schools");
      const data = await response.json();
      setSchools(data.schools);
    } catch (error) {
      console.error("Erro ao carregar escolas:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadClasses = async () => {
    try {
      const response = await fetch("/api/classes");
      const data = await response.json();
      setClasses(data.classes);
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  const getClassCount = (schoolId: string): number => {
    return classes.filter((c) => c.schoolId === schoolId).length;
  };

  const handleDelete = (school: School) => {
    Alert.alert("Excluir Escola", `Deseja realmente excluir ${school.name}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`/api/schools/${school.id}`, { method: "DELETE" });
            deleteSchool(school.id);
          } catch (error) {
            console.error("Erro ao excluir escola:", error);
          }
        },
      },
    ]);
  };

  const renderSchool = ({ item }: { item: School }) => (
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
          <Text fontSize="$lg" fontWeight="$bold" color="$coolGray800" mb="$1">
            {item.name}
          </Text>
          <Text fontSize="$sm" color="$coolGray600" mb="$1">
            {item.address}
          </Text>
          <Text fontSize="$xs" color="$blue600" fontWeight="$semibold">
            📚 {getClassCount(item.id)}{" "}
            {getClassCount(item.id) === 1 ? "turma" : "turmas"}
          </Text>
        </Box>
        <HStack space="xs">
          <Button
            flex={1}
            bg="$blue600"
            onPress={() => router.push(`/schools/${item.id}/classes`)}
            size="sm"
          >
            <ButtonText>Ver Turmas</ButtonText>
          </Button>
          <Button
            flex={1}
            bg="$green600"
            onPress={() => router.push(`/schools/form?id=${item.id}`)}
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

  useFocusEffect(
    useCallback(() => {
      loadSchools();
      loadClasses();
    }, [])
  );

  return (
    <Box flex={1} bg="$coolGray50">
      <Box
        bg="$white"
        p="$4"
        borderBottomWidth={1}
        borderBottomColor="$coolGray200"
      >
        <VStack space="md">
          <Heading size="xl" color="$coolGray800">
            Escolas Públicas
          </Heading>
          <Input variant="outline" size="lg">
            <InputField
              placeholder="Buscar escola..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </Input>
          <Button bg="$blue600" onPress={() => router.push("/schools/form")}>
            <ButtonText fontSize="$md" fontWeight="$bold">
              + Adicionar Escola
            </ButtonText>
          </Button>
        </VStack>
      </Box>
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$blue600" />
          <Text mt="$4" fontSize="$md" color="$coolGray600">
            Carregando escolas...
          </Text>
        </Box>
      ) : (
        <FlatList
          data={filteredSchools}
          renderItem={renderSchool}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </Box>
  );
}
