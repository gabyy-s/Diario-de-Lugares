import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView,} from 'react-native';
import { tirarFoto } from '../services/camera';
import { obterLocalizacao } from '../services/localizacao';
import {salvarRegistros, buscarRegistros,} from '../services/armazenamento';

type Props = {
  voltar: () => void;
};

export default function RegistroScreen({ voltar }: Props) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  async function abrirCamera() {
    try {
      const imagem = await tirarFoto();
      if (imagem) setFoto(imagem);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  }

  async function registrarLocalizacao() {
    try {
      const local = await obterLocalizacao();
      setLatitude(local.latitude);
      setLongitude(local.longitude);
      Alert.alert('Sucesso', 'Localização registrada!');
    } catch {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  }

  async function salvarLugar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Digite o nome do lugar.');
      return;
    }

    try {
      const registros = await buscarRegistros();

      const novoRegistro = {
        id: Date.now().toString(),
        nome: nome.trim(),
        descricao: descricao.trim(),
        foto,
        latitude,
        longitude,
        data: new Date().toLocaleDateString('pt-BR'),
      };

      await salvarRegistros([...registros, novoRegistro]);

      Alert.alert('Sucesso', 'Lugar salvo no diário!');

      setNome('');
      setDescricao('');
      setFoto(null);
      setLatitude(null);
      setLongitude(null);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o lugar.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registrar lugar</Text>

      <Text style={styles.label}>Nome do lugar</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Parque da cidade"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.descricao]}
        placeholder="Conte como foi sua visita"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.botao} onPress={abrirCamera}>
        <Text style={styles.textoBotao}>Tirar foto</Text>
      </TouchableOpacity>

      {foto && <Image source={{ uri: foto }} style={styles.foto} />}

      <TouchableOpacity
        style={styles.botao}
        onPress={registrarLocalizacao}
      >
        <Text style={styles.textoBotao}>Registrar localização</Text>
      </TouchableOpacity>

      {latitude !== null && longitude !== null && (
        <Text style={styles.coordenadas}>
          Latitude: {latitude.toFixed(4)}
          {'\n'}
          Longitude: {longitude.toFixed(4)}
        </Text>
      )}

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarLugar}>
        <Text style={styles.textoBotao}>Salvar lugar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
        <Text style={styles.textoBotao}>Voltar ao início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F0FF',
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6542A6',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#443653',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
  },
  descricao: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#8056C7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoSalvar: {
    backgroundColor: '#513080',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoVoltar: {
    backgroundColor: '#625873',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foto: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  coordenadas: {
    color: '#443653',
    marginBottom: 12,
    textAlign: 'center',
  },
});