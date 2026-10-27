
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  buscarRegistros,
  apagarRegistro,
} from '../services/armazenamento';

type Registro = {
  id: string;
  nome: string;
  descricao: string;
  foto: string | null;
  latitude: number | null;
  longitude: number | null;
  data: string;
};

type Props = {
  voltar: () => void;
};

export default function HistoricoScreen({ voltar }: Props) {
  const [registros, setRegistros] = useState<Registro[]>([]);

  const carregarRegistros = useCallback(async () => {
    try {
      const dados = await buscarRegistros();
      setRegistros(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar o diário.');
    }
  }, []);

  function confirmarExclusao(registro: Registro) {
    Alert.alert(
      'Apagar lugar',
      `Tem certeza que deseja apagar "${registro.nome}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              const atualizados = await apagarRegistro(registro.id);
              setRegistros(atualizados);
              Alert.alert('Sucesso', 'Lugar apagado do diário.');
            } catch {
              Alert.alert('Erro', 'Não foi possível apagar o lugar.');
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu diário</Text>

      <TouchableOpacity
        style={styles.atualizar}
        onPress={carregarRegistros}
      >
        <Text style={styles.textoBotao}>Atualizar diário</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.lista}>
        {registros.length === 0 ? (
          <Text style={styles.mensagem}>
            Nenhum lugar registrado ainda.
          </Text>
        ) : (
          registros.map((registro) => (
            <View key={registro.id} style={styles.card}>
              {registro.foto && (
                <Image
                  source={{ uri: registro.foto }}
                  style={styles.foto}
                />
              )}

              <Text style={styles.nome}>{registro.nome}</Text>
              <Text style={styles.data}>{registro.data}</Text>

              {!!registro.descricao && (
                <Text style={styles.descricao}>
                  {registro.descricao}
                </Text>
              )}

              {registro.latitude !== null &&
                registro.longitude !== null && (
                  <Text style={styles.localizacao}>
                    Latitude: {registro.latitude.toFixed(4)}
                    {'\n'}
                    Longitude: {registro.longitude.toFixed(4)}
                  </Text>
                )}

              <TouchableOpacity
                style={styles.botaoApagar}
                onPress={() => confirmarExclusao(registro)}
              >
                <Text style={styles.textoBotao}>Apagar lugar</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
        <Text style={styles.textoBotao}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0FF',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6542A6',
    textAlign: 'center',
    marginBottom: 12,
  },
  atualizar: {
    backgroundColor: '#8056C7',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  lista: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  mensagem: {
    fontSize: 16,
    color: '#625873',
    textAlign: 'center',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  foto: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6542A6',
  },
  data: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },
  descricao: {
    fontSize: 16,
    color: '#443653',
    marginTop: 10,
  },
  localizacao: {
    fontSize: 13,
    color: '#625873',
    marginTop: 10,
  },
  botaoApagar: {
    backgroundColor: '#B83232',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  botaoVoltar: {
    backgroundColor: '#513080',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
