
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@diario_lugares';

export async function salvarRegistros(registros: any[]) {
  await AsyncStorage.setItem(
    CHAVE,
    JSON.stringify(registros)
  );
}

export async function buscarRegistros() {
  const dados = await AsyncStorage.getItem(CHAVE);

  if (dados) {
    return JSON.parse(dados);
  }

  return [];
}

export async function apagarRegistro(id: string) {
  const registros = await buscarRegistros();

  const registrosAtualizados = registros.filter(
    (registro: any) => registro.id !== id
  );

  await salvarRegistros(registrosAtualizados);

  return registrosAtualizados;
}
