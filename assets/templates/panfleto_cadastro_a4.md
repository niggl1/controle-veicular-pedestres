# Modelo de Panfleto A4 - Cadastro via QR Code

## Layout do Panfleto

O panfleto A4 para distribuição por lote deve seguir o seguinte layout:

---

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [LOGO DA ORGANIZAÇÃO]                    │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│              SISTEMA DE CONTROLE DE ACESSO                  │
│                                                             │
│  ───────────────────────────────────────────────────────   │
│                                                             │
│                    CADASTRE-SE AGORA!                       │
│                                                             │
│         Escaneie o QR Code abaixo com seu celular           │
│              para realizar seu cadastro                     │
│                                                             │
│                                                             │
│                    ┌───────────────┐                        │
│                    │               │                        │
│                    │   [QR CODE]   │                        │
│                    │               │                        │
│                    │               │                        │
│                    └───────────────┘                        │
│                                                             │
│                   Código: XXXXXXXX                          │
│                                                             │
│  ───────────────────────────────────────────────────────   │
│                                                             │
│                     COMO CADASTRAR:                         │
│                                                             │
│    1. Abra a câmera do seu celular                         │
│    2. Aponte para o QR Code acima                          │
│    3. Clique no link que aparecer                          │
│    4. Preencha seus dados pessoais                         │
│    5. Aguarde a aprovação do administrador                 │
│                                                             │
│  ───────────────────────────────────────────────────────   │
│                                                             │
│                     INFORMAÇÕES:                            │
│                                                             │
│    Unidade/Lote: _______________________                   │
│                                                             │
│    Válido até: __/__/____                                  │
│                                                             │
│  ───────────────────────────────────────────────────────   │
│                                                             │
│    Dúvidas? Entre em contato:                              │
│    📱 WhatsApp: (XX) XXXXX-XXXX                            │
│    ✉️  E-mail: contato@organizacao.com.br                   │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│              [NOME DA ORGANIZAÇÃO]                          │
│              [ENDEREÇO COMPLETO]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Especificações Técnicas

### Dimensões
- **Formato**: A4 (210mm x 297mm)
- **Orientação**: Retrato (vertical)
- **Margens**: 15mm em todos os lados

### QR Code
- **Tamanho mínimo**: 60mm x 60mm
- **Tamanho recomendado**: 80mm x 80mm
- **Correção de erro**: Nível H (30%)
- **Cor**: Preto sobre fundo branco

### Tipografia
- **Título principal**: 24pt, negrito
- **Subtítulos**: 16pt, negrito
- **Texto corrido**: 12pt, regular
- **Código**: 14pt, monoespaçado

### Cores Recomendadas
- **Fundo**: Branco (#FFFFFF)
- **Texto principal**: Preto (#000000)
- **Destaques**: Cor primária da organização
- **QR Code**: Preto (#000000)

---

## Campos Personalizáveis

O sistema permite personalizar os seguintes campos no panfleto:

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| Logo | Logo da organização (PNG/JPG) | Sim |
| Nome da Organização | Nome completo | Sim |
| Endereço | Endereço completo | Não |
| Telefone/WhatsApp | Contato para suporte | Sim |
| E-mail | E-mail de contato | Não |
| Unidade/Lote | Identificação do lote | Sim |
| Data de Validade | Prazo para cadastro | Não |
| Código | Código único do QR | Automático |

---

## Instruções de Impressão

### Configurações Recomendadas
- **Qualidade**: Alta (300 DPI mínimo)
- **Papel**: Sulfite 75g/m² ou superior
- **Cor**: Colorido ou P&B (QR Code deve ser nítido)

### Dicas
1. Teste a leitura do QR Code antes de imprimir em grande quantidade
2. Evite dobrar o panfleto na área do QR Code
3. Mantenha o QR Code limpo e sem manchas
4. Use papel fosco para evitar reflexos na leitura

---

## Geração Automática

O sistema gera automaticamente o panfleto em PDF com:
- Logo da organização já cadastrada
- QR Code único por lote
- Código alfanumérico para digitação manual
- Data de validade configurável
- Informações de contato da organização

### Como Gerar
1. Acesse: Menu Admin > Cadastrar Usuários > QR Code (Panfleto)
2. Selecione o lote/unidade de destino
3. Configure a data de validade (opcional)
4. Clique em "Gerar Panfleto A4 (PDF)"
5. Faça o download e imprima

---

## Segurança

- Cada QR Code é único e vinculado a um lote específico
- O código expira após a data de validade configurada
- Cadastros são validados antes da aprovação
- Histórico de uso do código é registrado no sistema
