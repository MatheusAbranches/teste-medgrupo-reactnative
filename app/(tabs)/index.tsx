import {
  Box,
  Button,
  ButtonText,
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
import SchoolCard from "../../components/SchoolCard";
import { useStore } from "../../store/useStore";
import { School } from "../../types";

export default function SchoolsScreen() {
  const { schools, setSchools, deleteSchool, classes, setClasses } = useStore();
  const [searchText, setSearchText] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);

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
    <SchoolCard
      school={item}
      classCount={getClassCount(item.id)}
      onDelete={handleDelete}
    />
  );

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
