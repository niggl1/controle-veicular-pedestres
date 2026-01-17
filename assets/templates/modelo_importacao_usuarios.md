# Modelo de Planilha para Importação de Usuários

## Instruções de Preenchimento

Este documento descreve o formato da planilha Excel para importação em massa de usuários no sistema de Controle de Acesso.

---

## Estrutura da Planilha

A planilha deve conter as seguintes colunas na ordem especificada:

| Coluna | Campo | Obrigatório | Formato | Exemplo |
|--------|-------|-------------|---------|---------|
| A | Nome Completo | Sim | Texto | João da Silva Santos |
| B | E-mail | Sim | E-mail válido | joao.silva@email.com |
| C | Telefone | Não | (XX) XXXXX-XXXX | (11) 99999-9999 |
| D | Unidade/Setor | Sim | Texto | Bloco A - Apt 101 |
| E | Documento (CPF/CNPJ) | Não | XXX.XXX.XXX-XX ou XX.XXX.XXX/XXXX-XX | 123.456.789-00 |
| F | Perfil | Sim | usuario/portaria/gestao | usuario |
| G | Tipo | Sim | morador/colaborador/prestador | morador |
| H | Data Início | Não | DD/MM/AAAA | 01/01/2026 |
| I | Data Fim | Não | DD/MM/AAAA | 31/12/2026 |
| J | Observações | Não | Texto | Proprietário |

---

## Exemplo de Preenchimento

```
Nome Completo          | E-mail                  | Telefone        | Unidade/Setor      | Documento       | Perfil  | Tipo        | Data Início | Data Fim   | Observações
-----------------------|-------------------------|-----------------|--------------------|-----------------|---------| ------------|-------------|------------|-------------
Maria Silva Santos     | maria@email.com         | (11) 98765-4321 | Bloco A - Apt 101  | 123.456.789-00  | usuario | morador     | 01/01/2026  |            | Proprietária
João Pedro Costa       | joao.costa@empresa.com  | (11) 91234-5678 | Setor Administrativo| 987.654.321-00 | usuario | colaborador | 01/01/2026  | 31/12/2026 | Funcionário
Ana Maria Oliveira     | ana@email.com           | (11) 99876-5432 | Bloco B - Apt 202  | 456.789.123-00  | usuario | morador     | 01/01/2026  |            | Inquilina
Carlos Souza           | carlos@portaria.com     | (11) 97654-3210 | Portaria Principal |                 | portaria| colaborador | 01/01/2026  |            | Turno Manhã
```

---

## Regras de Validação

### Campos Obrigatórios
- **Nome Completo**: Mínimo de 3 caracteres
- **E-mail**: Deve ser um e-mail válido e único no sistema
- **Unidade/Setor**: Deve corresponder a uma unidade cadastrada
- **Perfil**: Deve ser um dos valores: `usuario`, `portaria`, `gestao`
- **Tipo**: Deve ser um dos valores: `morador`, `colaborador`, `prestador`

### Campos Opcionais
- **Telefone**: Se preenchido, deve seguir o formato brasileiro
- **Documento**: Se preenchido, deve ser um CPF ou CNPJ válido
- **Data Início/Fim**: Se preenchido, deve seguir o formato DD/MM/AAAA
- **Observações**: Texto livre, máximo 500 caracteres

---

## Perfis Disponíveis

| Perfil | Descrição | Permissões |
|--------|-----------|------------|
| usuario | Morador ou Colaborador | Liberar visitantes, gerar convites, visualizar histórico |
| portaria | Porteiro/Recepcionista | Controle de acesso, registro de entrada/saída |
| gestao | Síndico/Gestor | Relatórios, configurações, gerenciamento de usuários |

---

## Tipos de Usuário

| Tipo | Descrição | Uso |
|------|-----------|-----|
| morador | Residente do condomínio | Condomínios residenciais |
| colaborador | Funcionário da empresa | Empresas e condomínios comerciais |
| prestador | Prestador de serviço | Acesso temporário |

---

## Observações Importantes

1. **Primeira linha**: A primeira linha da planilha deve conter os cabeçalhos das colunas
2. **Codificação**: Salve o arquivo em formato UTF-8 para evitar problemas com acentuação
3. **Formato do arquivo**: Aceitos: .xlsx, .xls, .csv
4. **Limite por importação**: Máximo de 500 usuários por arquivo
5. **E-mails duplicados**: O sistema rejeitará linhas com e-mails já cadastrados
6. **Validação prévia**: O sistema validará todos os dados antes de confirmar a importação

---

## Download do Modelo

Para baixar o modelo pronto para preenchimento, acesse:
- Dentro do aplicativo: Menu Admin > Cadastrar Usuários > Planilha Excel > Baixar Modelo
- Ou solicite ao administrador do sistema

---

## Suporte

Em caso de dúvidas sobre o preenchimento da planilha:
- Acesse a seção de Ajuda no aplicativo
- Entre em contato com o suporte técnico via WhatsApp
