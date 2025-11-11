import { Box, Button, ButtonText, HStack, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { School } from "../types";

interface SchoolCardProps {
  school: School;
  classCount: number;
  onDelete: (school: School) => void;
}

export default function SchoolCard({ school, classCount, onDelete }: SchoolCardProps) {
  return (
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
            {school.name}
          </Text>
          <Text fontSize="$sm" color="$coolGray600" mb="$1">
            {school.address}
          </Text>
          <Text fontSize="$xs" color="$blue600" fontWeight="$semibold">
            📚 {classCount} {classCount === 1 ? "turma" : "turmas"}
          </Text>
        </Box>
        <HStack space="xs">
          <Button
            flex={1}
            bg="$blue600"
            onPress={() => router.push(`/schools/${school.id}/classes`)}
            size="sm"
          >
            <ButtonText>Ver Turmas</ButtonText>
          </Button>
          <Button
            flex={1}
            bg="$green600"
            onPress={() => router.push(`/schools/form?id=${school.id}`)}
            size="sm"
          >
            <ButtonText>Editar</ButtonText>
          </Button>
          <Button
            flex={1}
            bg="$red600"
            onPress={() => onDelete(school)}
            size="sm"
          >
            <ButtonText>Excluir</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
