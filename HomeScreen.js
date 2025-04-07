import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  FlatList, TouchableOpacity, Switch, Button, ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const filmes = [
  {
    nome: 'Vingadores',
    imagem: 'https://wp.ufpel.edu.br/empauta/files/2019/05/vingadores-ultimato-poster.jpg',
    ano: '2012',
    diretor: 'Joss Whedon',
    nota: 10,
    popularidade: 100,
    nacionalidade: 'EUA',
    idioma: 'Inglês',
    genero: 'Ação',
  },
  {
    nome: 'Toy Story',
    imagem: 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/574/CURIOSIDADES-SOBRE-TOY-STORY-CAPA.jpg',
    ano: '1995',
    diretor: 'John Lasseter',
    nota: 10,
    popularidade: 100,
    nacionalidade: 'EUA',
    idioma: 'Inglês',
    genero: 'Animação',
  },
  {
    nome: 'Capitão América: Soldado Invernal',
    imagem: 'https://cineset.com.br/wp-content/uploads/2014/08/capitao_america_2_banner1.jpg',
    ano: '2014',
    diretor: 'Anthony Russo',
    nota: 10,
    popularidade: 100,
    nacionalidade: 'EUA',
    idioma: 'Inglês',
    genero: 'Ação',
  },
  {
    nome: 'Homem de Ferro 3',
    imagem: 'https://m.media-amazon.com/images/S/pv-target-images/7863abfd8ffbaa73ad7f39c602ab93c497e67b5bf6e8d1300074c7c2a8b747e1._UR1920,1080_.jpg',
    ano: '2013',
    diretor: 'Shane Black',
    nota: 10,
    popularidade: 100,
    nacionalidade: 'EUA',
    idioma: 'Inglês',
    genero: 'Ação',
  },
  {
    nome: 'Matrix',
    imagem: 'https://upload.wikimedia.org/wikipedia/pt/c/c1/The_Matrix_Poster.jpg',
    ano: '1999',
    diretor: 'Lana Wachowski',
    nota: 10,
    popularidade: 100,
    nacionalidade: 'EUA',
    idioma: 'Inglês',
    genero: 'Ficção Científica',
  },
];

export default function HomeScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [idioma, setIdioma] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [diretorSelecionado, setDiretorSelecionado] = useState('');
  const [nota, setNota] = useState(0);
  const [popularidade, setPopularidade] = useState(0);
  const [assistido, setAssistido] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);

  const anos = ['', ...new Set(filmes.map(f => f.ano))];
  const diretores = ['', ...new Set(filmes.map(f => f.diretor))];

  const handleFiltrar = () => {
    const resultado = filmes.filter(f =>
      (nome === '' || f.nome.toLowerCase().includes(nome.toLowerCase())) &&
      (genero === '' || f.genero.toLowerCase().includes(genero.toLowerCase())) &&
      (nacionalidade === '' || f.nacionalidade.toLowerCase().includes(nacionalidade.toLowerCase())) &&
      (idioma === '' || f.idioma.toLowerCase().includes(idioma.toLowerCase())) &&
      (anoSelecionado === '' || f.ano === anoSelecionado) &&
      (diretorSelecionado === '' || f.diretor === diretorSelecionado) &&
      f.nota >= nota &&
      f.popularidade >= popularidade
    );

    setFilmesFiltrados(resultado);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Catálogo de Filmes</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Gênero" value={genero} onChangeText={setGenero} style={styles.input} />
      <TextInput placeholder="Nacionalidade" value={nacionalidade} onChangeText={setNacionalidade} style={styles.input} />
      <TextInput placeholder="Idioma do Filme" value={idioma} onChangeText={setIdioma} style={styles.input} />

      <Picker selectedValue={anoSelecionado} onValueChange={setAnoSelecionado} style={styles.picker}>
        <Picker.Item label="Selecione o Ano" value="" />
        {anos.map((ano, index) => (
          <Picker.Item key={index} label={ano} value={ano} />
        ))}
      </Picker>

      <Picker selectedValue={diretorSelecionado} onValueChange={setDiretorSelecionado} style={styles.picker}>
        <Picker.Item label="Selecione o Diretor" value="" />
        {diretores.map((d, index) => (
          <Picker.Item key={index} label={d} value={d} />
        ))}
      </Picker>

      <Text>Nota mínima: {nota}</Text>
      <Slider minimumValue={0} maximumValue={10} step={1} value={nota} onValueChange={setNota} />

      <Text>Popularidade mínima: {popularidade}</Text>
      <Slider minimumValue={0} maximumValue={100} step={1} value={popularidade} onValueChange={setPopularidade} />

      <View style={styles.switchContainer}>
        <Text>Assistido:</Text>
        <Switch value={assistido} onValueChange={setAssistido} />
        <Text>Favorito:</Text>
        <Switch value={favorito} onValueChange={setFavorito} />
      </View>

      <Button title="Filtrar Filme" onPress={handleFiltrar} />

      <Text style={styles.resultTitle}>Clique para mais detalhes:</Text>
      {filmesFiltrados.length === 0 ? (
        <Text>Nenhum filme encontrado</Text>
      ) : (
        filmesFiltrados.map((filme, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Resumo do Filme', { filme })}
          >
            <Image source={{ uri: filme.imagem }} style={styles.image} />
            <Text style={styles.filmeNome}>{filme.nome}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5 },
  picker: { backgroundColor: '#fff', marginBottom: 10 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: { width: 100, height: 150, borderRadius: 10 },
  resultTitle: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  filmeNome: {
    marginTop: 10,
    fontWeight: 'bold',
  }
});
