import * as Location from 'expo-location';

export async function obterLocalizacao() {
  const permissao =
    await Location.requestForegroundPermissionsAsync();

  if (!permissao.granted) {
    throw new Error('Permissão para acessar a localização negada.');
  }

  const localizacao = await Location.getCurrentPositionAsync({});

  return {
    latitude: localizacao.coords.latitude,
    longitude: localizacao.coords.longitude,
  };
}
