
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  irParaRegistro: () => void;
  irParaHistorico: () => void;
};

export default function HomeScreen({
  irParaRegistro,
  irParaHistorico,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Diário de Lugares</Text>

      <Text style={styles.subtitulo}>
        Registre os lugares que você visitou!
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={irParaRegistro}
      >
        <Text style={styles.textoBotao}>Registrar lugar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={irParaHistorico}
      >
        <Text style={styles.textoBotao}>Meu diário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0FF',
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6542A6',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#625873',
    marginTop: 10,
    marginBottom: 32,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#8056C7',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
  },
  botaoSecundario: {
    backgroundColor: '#513080',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
