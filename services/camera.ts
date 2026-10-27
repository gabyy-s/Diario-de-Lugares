import * as ImagePicker from 'expo-image-picker';

export async function tirarFoto() {
  const permissao =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permissao.granted) {
    throw new Error('Permissão para usar a câmera negada.');
  }

  const resultado = await ImagePicker.launchCameraAsync({
    quality: 0.7,
  });

  if (resultado.canceled) {
    return null;
  }

  return resultado.assets[0].uri;
}
