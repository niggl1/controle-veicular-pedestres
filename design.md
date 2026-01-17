# Design do Sistema: Controle Veicular e de Pedestres

## 1. Visão Geral da Interface

O sistema segue uma arquitetura **mobile-first** com orientação **retrato (9:16)** e design otimizado para **uso com uma mão**. A interface segue as diretrizes do **Apple Human Interface Guidelines (HIG)** para garantir uma experiência nativa e familiar aos usuários iOS e Android.

## 2. Lista de Telas

### 2.1. Telas de Autenticação
| Tela | Descrição |
|------|-----------|
| **Login** | Tela inicial com logo da organização, campos de e-mail/telefone e senha, botões de ação |
| **Cadastro de Organização** | Formulário para registro de novo condomínio/empresa |
| **Recuperar Senha** | Tela para solicitar redefinição de senha por e-mail |
| **Seleção de Perfil** | Após login, usuário seleciona seu perfil (Usuário, Portaria, Gestão, Admin) |

### 2.2. Telas do Módulo Portaria
| Tela | Descrição |
|------|-----------|
| **Home Portaria** | Dashboard com ícones de acesso rápido às funções principais |
| **Controle Veicular** | Campo de placa, botão OCR, exibição de dados do veículo |
| **Controle de Pedestre** | Formulário com foto, nome, documento, destino |
| **Solicitar Liberação** | Tela de confirmação antes de enviar push/WhatsApp |
| **Histórico de Acessos** | Lista de entradas/saídas do dia |

### 2.3. Telas do Módulo Usuário (Morador/Colaborador)
| Tela | Descrição |
|------|-----------|
| **Home Usuário** | Dashboard com ícones de acesso rápido |
| **Liberar Visitante** | Formulário para pré-autorização manual |
| **Liberar Veículo** | Formulário para pré-autorização de veículo |
| **Gerar Convite** | Geração de QR Code ou link para visitante |
| **Autorizações Recorrentes** | Lista e cadastro de autorizações periódicas |
| **Histórico de Visitantes** | Lista de visitantes anteriores com opção de re-autorizar |
| **Prestadores de Serviço** | Gestão de credenciais temporárias |
| **Notificações** | Lista de solicitações pendentes de aprovação |

### 2.4. Telas do Módulo Gestão/Admin (Dashboard Web)
| Tela | Descrição |
|------|-----------|
| **Dashboard Principal** | Visão geral com métricas e gráficos |
| **Lotação em Tempo Real** | Painel com contagem de visitantes/veículos |
| **Relatórios** | Filtros e exportação de logs de acesso |
| **Lista de Restrição** | Gestão da blacklist |
| **Configurações** | Upload de logo, campos personalizáveis |
| **Cadastro em Massa** | Upload de planilha Excel |
| **Alertas de Anomalia** | Notificações de comportamentos suspeitos |

## 3. Conteúdo Principal e Funcionalidades por Tela

### 3.1. Tela de Login
- **Logo da Organização** (carregada dinamicamente do servidor)
- **Campo E-mail/Telefone** com validação
- **Campo Senha** com ícone de olho para visualização
- **Link "Esqueci minha senha"**
- **Botão "Entrar"** (primário, destaque)
- **Botão "Cadastrar Organização"** (secundário)
- **Botão "Falar com Suporte"** com ícone WhatsApp

### 3.2. Home Portaria
- **Ícone Controle Veicular** (carro) - acesso à tela de veículos
- **Ícone Controle de Pedestre** (pessoa) - acesso à tela de pedestres
- **Ícone Histórico** (relógio) - acessos do dia
- **Indicador de Lotação** (badge com número de visitantes ativos)
- **Indicador de Modo Offline** (quando sem internet)

### 3.3. Controle Veicular (Portaria)
- **Campo de Placa** (formato AAA-0000 ou Mercosul)
- **Botão "Leitura OCR"** (abre câmera para leitura automática)
- **Card de Resultado** com dados do veículo:
  - Modelo, Cor, Proprietário, Unidade/Setor
  - Status: "Liberado Previamente" (verde) ou "Não Liberado" (amarelo)
- **Formulário de Cadastro** (se veículo não encontrado):
  - Modelo, Cor, Bloco/Setor, Usuário de destino, Observações
- **Botões de Ação**: "Registrar Entrada" / "Registrar Saída"

### 3.4. Controle de Pedestre (Portaria)
- **Botão Capturar Foto** (abre câmera)
- **Campo Nome**
- **Campo Documento** (CPF/RG)
- **Seletor Bloco/Setor de Destino**
- **Seletor Usuário de Destino**
- **Campo Observações**
- **Botão "Solicitar Liberação"** (envia push)
- **Botão "Solicitar via WhatsApp"** (abre WhatsApp)

### 3.5. Home Usuário
- **Ícone Liberar Visitante** (pessoa com check)
- **Ícone Liberar Veículo** (carro com check)
- **Ícone Gerar Convite** (QR Code)
- **Ícone Autorizações Recorrentes** (calendário)
- **Ícone Prestadores** (ferramenta)
- **Badge de Notificações** (solicitações pendentes)

### 3.6. Gerar Convite (Usuário)
- **Opção QR Code** (exibe código na tela)
- **Opção Link** (copia para área de transferência)
- **Botão Compartilhar** (abre sheet de compartilhamento nativo)
- **Campos opcionais**: Data/hora limite, Observações

## 4. Fluxos de Usuário Principais

### Fluxo 1: Entrada de Veículo na Portaria
1. Porteiro abre "Controle Veicular"
2. Digita placa ou usa OCR
3. Sistema consulta base de dados
4. **Se cadastrado**: Exibe dados e status de liberação prévia
5. **Se não cadastrado**: Exibe formulário para preenchimento
6. Porteiro clica em "Registrar Entrada"
7. Sistema registra log de acesso

### Fluxo 2: Entrada de Pedestre com Aprovação
1. Porteiro abre "Controle de Pedestre"
2. Preenche dados e seleciona destino
3. Clica em "Solicitar Liberação"
4. Usuário de destino recebe notificação push
5. Usuário aprova ou nega diretamente na notificação
6. Porteiro recebe confirmação na tela
7. Porteiro registra entrada

### Fluxo 3: Usuário Gera Convite para Visitante
1. Usuário abre "Gerar Convite"
2. Escolhe QR Code ou Link
3. Compartilha com visitante
4. Visitante acessa link e preenche seus dados
5. Dados aparecem no app do usuário
6. Usuário clica em "Aprovar Liberação Prévia"
7. Dados ficam disponíveis na portaria

### Fluxo 4: Autorização Recorrente
1. Usuário abre "Autorizações Recorrentes"
2. Clica em "Nova Autorização"
3. Preenche dados do visitante/veículo
4. Define dias da semana e horários permitidos
5. Salva autorização
6. Sistema libera automaticamente nos horários definidos

## 5. Paleta de Cores

| Token | Cor Light | Cor Dark | Uso |
|-------|-----------|----------|-----|
| **primary** | #1E40AF | #3B82F6 | Botões principais, destaques |
| **background** | #FFFFFF | #0F172A | Fundo das telas |
| **surface** | #F1F5F9 | #1E293B | Cards, modais |
| **foreground** | #0F172A | #F8FAFC | Texto principal |
| **muted** | #64748B | #94A3B8 | Texto secundário |
| **border** | #E2E8F0 | #334155 | Bordas, divisores |
| **success** | #16A34A | #22C55E | Status aprovado/liberado |
| **warning** | #D97706 | #F59E0B | Status pendente |
| **error** | #DC2626 | #EF4444 | Status negado/bloqueado |

## 6. Componentes Reutilizáveis

- **IconButton**: Botão quadrado com ícone e label (usado na home)
- **StatusBadge**: Badge colorido para status (Liberado, Pendente, Negado)
- **VehicleCard**: Card com dados do veículo
- **VisitorCard**: Card com dados do visitante
- **InputField**: Campo de texto estilizado
- **ActionButton**: Botão de ação primário/secundário
- **NotificationItem**: Item de lista de notificações
- **QRCodeDisplay**: Componente para exibir QR Code gerado
