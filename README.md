# Diário de Lugares

## 1. Sobre o projeto

O Diário de Lugares é um aplicativo desenvolvido com React Native, Expo e TypeScript. Seu objetivo é permitir que o usuário registre lugares que visitou, guarde informações sobre cada visita e consulte esses registros posteriormente.

O aplicativo utiliza recursos do dispositivo, como câmera e localização geográfica, e armazena os registros localmente.

## 2. Funcionalidades

- Registrar o nome de um lugar.
- Adicionar uma descrição sobre a visita.
- Tirar uma foto utilizando a câmera.
- Registrar a localização por latitude e longitude.
- Salvar os registros no armazenamento local.
- Consultar os lugares registrados.
- Apagar um registro específico após uma confirmação.
- Navegar entre as telas do aplicativo.

## 3. Tecnologias utilizadas

- **React Native:** permite desenvolver a interface do aplicativo.
- **Expo:** facilita a criação, a execução e os testes do aplicativo.
- **TypeScript:** adiciona tipagem ao JavaScript e ajuda a identificar erros.
- **Expo Image Picker:** permite solicitar acesso à câmera e tirar fotos.
- **Expo Location:** permite obter a localização geográfica do dispositivo.
- **AsyncStorage:** armazena e recupera os registros localmente.
- **VS Code:** editor utilizado para escrever e organizar os códigos.
- **Android Emulator:** utilizado para executar o aplicativo durante o desenvolvimento.

## 4. Organização dos arquivos

### `App.tsx`

É o arquivo principal do aplicativo. Utiliza o hook `useState` para controlar qual tela está sendo exibida.

A variável `tela` pode receber os valores `inicio`, `registro` ou `historico`. Com base nesse valor, o aplicativo apresenta a tela correspondente.

A função `setTela()` altera a tela atual quando o usuário seleciona um botão.

### `src/screens/HomeScreen.tsx`

Contém a tela inicial do aplicativo. Apresenta o nome Diário de Lugares e os botões para acessar a tela de registro e o histórico.

Recebe as funções `irParaRegistro` e `irParaHistorico` por meio das propriedades do componente.

### `src/screens/RegistroScreen.tsx`

Contém a tela utilizada para registrar um lugar.

Permite preencher o nome e a descrição, tirar uma foto, obter a localização e salvar o registro.

Utiliza o hook `useState` para guardar temporariamente as informações preenchidas.

As principais funções são:

- `abrirCamera()`: chama o serviço responsável pela câmera.
- `registrarLocalizacao()`: obtém a localização do dispositivo.
- `salvarLugar()`: verifica se o nome foi preenchido, cria o registro e solicita seu armazenamento.

### `src/screens/HistoricoScreen.tsx`

Contém a tela Meu diário, responsável por apresentar os lugares salvos.

A função `carregarRegistros()` consulta o armazenamento local e atualiza a lista exibida.

Cada lugar aparece em um cartão com suas informações disponíveis e um botão para apagá-lo.

A função `confirmarExclusao()` pede confirmação antes da exclusão. Se o usuário confirmar, chama `apagarRegistro()` e atualiza a lista.

O hook `useState` mantém os registros exibidos na tela, enquanto `useCallback` define a função utilizada para carregar os registros.

### `src/services/camera.ts`

Responsável pela utilização da câmera.

A função `tirarFoto()` solicita a permissão de câmera utilizando o Expo Image Picker. Quando a permissão é concedida, abre a câmera. Se o usuário cancelar, retorna `null`; caso tire uma foto, retorna o endereço local da imagem.

### `src/services/localizacao.ts`

Responsável pela obtenção da localização geográfica.

A função `obterLocalizacao()` solicita permissão de localização em primeiro plano utilizando o Expo Location. Depois, obtém a posição atual e retorna os valores de latitude e longitude.

### `src/services/armazenamento.ts`

Responsável por salvar, consultar e apagar os registros utilizando AsyncStorage.

- `salvarRegistros()`: converte a lista em texto JSON e salva os dados.
- `buscarRegistros()`: recupera os dados armazenados e os transforma novamente em uma lista.
- `apagarRegistro()`: remove da lista o registro que possui o identificador informado e salva a lista atualizada.

## 5. O que cada registro guarda? — Q1

Cada registro possui os seguintes campos:

| Campo | Finalidade |
|---|---|
| `id` | Identifica cada registro de forma única. |
| `nome` | Guarda o nome do lugar. |
| `descricao` | Armazena informações sobre a visita. |
| `foto` | Guarda o endereço local da imagem. |
| `latitude` | Armazena a latitude, quando registrada. |
| `longitude` | Armazena a longitude, quando registrada. |
| `data` | Registra a data em que o lugar foi cadastrado. |

A foto e a localização são opcionais, pois o aplicativo permite salvar um registro sem esses dados.

## 6. Quais telas existem? — Q2

O aplicativo possui três telas principais:

1. **Tela inicial:** apresenta o aplicativo e permite acessar as outras telas.
2. **Tela de registro:** permite informar os dados de um lugar, tirar uma foto, obter a localização e salvar o registro.
3. **Tela Meu diário:** exibe os registros salvos e permite apagar um lugar após uma confirmação.

## 7. Qual é a regra de aceite? — Q3

O usuário precisa informar o nome do lugar antes de salvá-lo. Se o campo estiver vazio, o aplicativo apresenta uma mensagem de atenção e impede o salvamento.

A foto e a localização são opcionais. Para excluir um lugar, o usuário precisa confirmar a ação. Se escolher cancelar, o registro permanece salvo.

## 8. Armazenamento dos dados

Os registros são armazenados localmente utilizando AsyncStorage. Antes de serem salvos, os dados são convertidos para JSON. Quando são consultados, são recuperados e transformados novamente em uma lista.

A exclusão de um lugar atualiza a lista armazenada, mantendo os demais registros.

As imagens são referenciadas por seus endereços locais. A permanência das fotos depende de onde os arquivos são armazenados; o AsyncStorage, por si só, não garante que todas as imagens continuarão disponíveis indefinidamente.

## 9. Como executar o projeto

É necessário ter o Node.js instalado.

1. Abra a pasta do projeto no terminal.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o Expo:

   ```bash
   npx expo start
   ```

4. Abra o aplicativo em um emulador Android compatível ou em um dispositivo utilizando um método de execução compatível com a versão do Expo instalada.

## 10. Testes realizados

Durante o desenvolvimento, o aplicativo foi iniciado no emulador Android e a navegação entre as telas foi verificada.

A funcionalidade de exclusão foi implementada com confirmação antes de apagar um registro e atualização da lista após a exclusão.

Os recursos de câmera, localização, salvamento e recuperação dos dados devem ser testados para confirmar seu funcionamento no dispositivo utilizado.

## 11. Objetivo educacional

A atividade tem como objetivo praticar o desenvolvimento de aplicativos móveis, a organização de componentes e serviços, a utilização dos recursos do dispositivo e o armazenamento local de informações.

O projeto permite compreender como diferentes arquivos e funções trabalham em conjunto para formar um aplicativo funcional.
