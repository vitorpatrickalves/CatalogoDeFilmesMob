import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function SummaryScreen({ route }) {
  const { filme } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumo do Filme</Text>
      <Image source={{ uri: filme.imagem }} style={styles.image} />
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.value}>{filme.nome}</Text>
      <Text style={styles.label}>Ano de Lançamento:</Text>
      <Text style={styles.value}>{filme.ano}</Text>
      <Text style={styles.label}>Diretor:</Text>
      <Text style={styles.value}>{filme.diretor}</Text>
      <Text style={styles.label}>Gênero:</Text>
      <Text style={styles.value}>{filme.genero}</Text>
      <Text style={styles.label}>Nacionalidade:</Text>
      <Text style={styles.value}>{filme.nacionalidade}</Text>
      <Text style={styles.label}>Idioma:</Text>
      <Text style={styles.value}>{filme.idioma}</Text>
      <Text style={styles.label}>Nota:</Text>
      <Text style={styles.value}>{filme.nota}</Text>
      <Text style={styles.label}>Popularidade:</Text>
      <Text style={styles.value}>{filme.popularidade}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
