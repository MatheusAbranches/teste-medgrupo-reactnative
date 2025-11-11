import { Box, Divider, Heading, Text, VStack } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '$coolGray50' }}>
      <Box p="$4">
        <VStack space="md">
          <Box
            bg="$white"
            borderRadius="$xl"
            p="$5"
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={3}
          >
            <VStack space="md">
              <Heading size="xl" color="$coolGray800" textAlign="center">
                Sistema de Gestão Escolar
              </Heading>
              <Divider />
              <Text fontSize="$md" color="$coolGray600" textAlign="center" lineHeight="$lg">
                Aplicativo desenvolvido para a prefeitura gerenciar escolas públicas e suas turmas.
              </Text>
            </VStack>
          </Box>

          <Box
            bg="$white"
            borderRadius="$xl"
            p="$5"
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={3}
          >
            <VStack space="md">
              <Heading size="lg" color="$coolGray800">
                🚀 Tecnologias utilizadas:
              </Heading>
              <Text fontSize="$md" color="$coolGray600">• React Native 0.81</Text>
              <Text fontSize="$md" color="$coolGray600">• Expo SDK 54</Text>
              <Text fontSize="$md" color="$coolGray600">• TypeScript</Text>
              <Text fontSize="$md" color="$coolGray600">• Gluestack UI</Text>
              <Text fontSize="$md" color="$coolGray600">• Zustand (State Management)</Text>
              <Text fontSize="$md" color="$coolGray600">• MirageJS (Mock API)</Text>
              <Text fontSize="$md" color="$coolGray600">• Expo Router</Text>
            </VStack>
          </Box>

          <Box
            bg="$blue50"
            borderWidth={1}
            borderColor="$blue200"
            borderRadius="$xl"
            p="$4"
          >
            <Text fontSize="$sm" color="$blue700" textAlign="center">
              Desenvolvido como desafio técnico para vaga de React Native Developer
            </Text>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
