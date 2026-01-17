import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { ActionButton } from '@/components/ui/action-button';
import { InputField } from '@/components/ui/input-field';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

type RegisterMethod = 'qrcode' | 'excel' | 'cnpj' | 'link' | 'manual';

interface RegisterOption {
  key: RegisterMethod;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function RegisterUsersScreen() {
  const colors = useColors();
  const [selectedMethod, setSelectedMethod] = useState<RegisterMethod | null>(null);

  // Manual registration form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('');
  const [document, setDocument] = useState('');

  // CNPJ search
  const [cnpj, setCnpj] = useState('');
  const [cnpjLoading, setCnpjLoading] = useState(false);

  // Link generation
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const registerOptions: RegisterOption[] = [
    {
      key: 'qrcode',
      icon: 'qrcode',
      title: 'QR Code (Panfleto)',
      description: 'Usuário escaneia QR Code de um panfleto A4 distribuído por lote',
      color: colors.primary,
    },
    {
      key: 'excel',
      icon: 'doc.text.fill',
      title: 'Planilha Excel',
      description: 'Importe usuários em massa através de uma planilha Excel',
      color: colors.success,
    },
    {
      key: 'cnpj',
      icon: 'building.2.fill',
      title: 'Busca por CNPJ',
      description: 'Busque dados da empresa automaticamente pelo CNPJ',
      color: colors.warning,
    },
    {
      key: 'link',
      icon: 'link',
      title: 'Link de Cadastro',
      description: 'Gere um link único para o usuário se cadastrar',
      color: '#8B5CF6',
    },
    {
      key: 'manual',
      icon: 'person.badge.plus',
      title: 'Cadastro Manual',
      description: 'Cadastre um usuário manualmente preenchendo os dados',
      color: colors.muted,
    },
  ];

  const handleBack = () => {
    if (selectedMethod) {
      setSelectedMethod(null);
    } else {
      router.back();
    }
  };

  const handleGenerateQRCode = () => {
    alert('QR Code gerado! Faça o download do panfleto A4 para distribuição.');
  };

  const handleDownloadTemplate = () => {
    alert('Download do modelo de planilha Excel iniciado!');
  };

  const handleUploadExcel = () => {
    alert('Selecione o arquivo Excel para importação');
  };

  const handleSearchCNPJ = async () => {
    if (!cnpj.trim()) {
      alert('Por favor, informe o CNPJ');
      return;
    }

    setCnpjLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCnpjLoading(false);

    // Mock data
    setName('Empresa Exemplo LTDA');
    setEmail('contato@empresa.com.br');
    setPhone('(11) 3000-0000');
  };

  const handleGenerateLink = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const link = `https://acesso.app/cadastro/${code}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = async () => {
    try {
      // In a real app, use Clipboard API
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      alert('Link copiado!');
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleSaveManual = () => {
    if (!name.trim() || !email.trim()) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }
    alert('Usuário cadastrado com sucesso!');
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setUnit('');
    setDocument('');
    setCnpj('');
    setGeneratedLink('');
  };

  const renderMethodContent = () => {
    switch (selectedMethod) {
      case 'qrcode':
        return (
          <View className="px-4">
            <View className="bg-surface rounded-2xl p-6 items-center mb-6">
              <View className="w-48 h-48 bg-white rounded-xl items-center justify-center mb-4 border border-border">
                <IconSymbol name="qrcode" size={120} color={colors.foreground} />
              </View>
              <Text className="text-lg font-bold text-foreground text-center mb-2">
                QR Code de Cadastro
              </Text>
              <Text className="text-sm text-muted text-center">
                Este QR Code pode ser impresso em panfletos A4 e distribuído por lote para que os usuários se cadastrem.
              </Text>
            </View>

            <ActionButton
              title="Gerar Panfleto A4 (PDF)"
              icon="doc.fill"
              onPress={handleGenerateQRCode}
              fullWidth
              size="lg"
            />

            <View className="bg-primary/10 rounded-xl p-4 mt-6">
              <View className="flex-row items-start">
                <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-medium text-foreground">Como funciona</Text>
                  <Text className="text-xs text-muted mt-1">
                    1. Gere o panfleto A4 com o QR Code{'\n'}
                    2. Imprima e distribua por lote/setor{'\n'}
                    3. Usuários escaneiam e preenchem seus dados{'\n'}
                    4. Você aprova os cadastros no painel
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'excel':
        return (
          <View className="px-4">
            <View className="bg-surface rounded-2xl p-4 mb-6">
              <Text className="text-lg font-bold text-foreground mb-4">Importação via Excel</Text>
              
              <View className="bg-primary/10 rounded-xl p-4 mb-4">
                <View className="flex-row items-center">
                  <IconSymbol name="doc.text.fill" size={24} color={colors.primary} />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-medium text-foreground">Modelo de Planilha</Text>
                    <Text className="text-xs text-muted">Baixe o modelo e preencha com os dados dos usuários</Text>
                  </View>
                </View>
              </View>

              <ActionButton
                title="Baixar Modelo Excel"
                icon="arrow.down.circle.fill"
                onPress={handleDownloadTemplate}
                variant="outline"
                fullWidth
                className="mb-4"
              />

              <View className="border-2 border-dashed border-border rounded-xl p-8 items-center">
                <IconSymbol name="doc.fill" size={48} color={colors.muted} />
                <Text className="text-base font-medium text-foreground mt-4">
                  Arraste o arquivo aqui
                </Text>
                <Text className="text-sm text-muted mt-1">ou</Text>
                <ActionButton
                  title="Selecionar Arquivo"
                  onPress={handleUploadExcel}
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                />
              </View>
            </View>

            <View className="bg-warning/10 rounded-xl p-4">
              <View className="flex-row items-start">
                <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.warning} />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-medium text-foreground">Importante</Text>
                  <Text className="text-xs text-muted mt-1">
                    A planilha deve conter as colunas: Nome, E-mail, Telefone, Unidade, Documento. Verifique o modelo antes de importar.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'cnpj':
        return (
          <View className="px-4">
            <View className="bg-surface rounded-2xl p-4 mb-6">
              <Text className="text-lg font-bold text-foreground mb-4">Busca por CNPJ</Text>

              <InputField
                label="CNPJ"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChangeText={setCnpj}
                keyboardType="numeric"
                leftIcon="building.2.fill"
              />

              <ActionButton
                title="Buscar Dados"
                icon="magnifyingglass"
                onPress={handleSearchCNPJ}
                loading={cnpjLoading}
                fullWidth
                className="mb-4"
              />

              {name && (
                <View className="border-t border-border pt-4 mt-2">
                  <Text className="text-sm font-medium text-muted mb-3">Dados Encontrados</Text>
                  <InputField
                    label="Razão Social"
                    value={name}
                    onChangeText={setName}
                    leftIcon="building.2.fill"
                  />
                  <InputField
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    leftIcon="message.fill"
                  />
                  <InputField
                    label="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    leftIcon="phone.fill"
                  />
                  <ActionButton
                    title="Cadastrar Empresa"
                    icon="checkmark"
                    onPress={handleSaveManual}
                    fullWidth
                    size="lg"
                  />
                </View>
              )}
            </View>
          </View>
        );

      case 'link':
        return (
          <View className="px-4">
            <View className="bg-surface rounded-2xl p-4 mb-6">
              <Text className="text-lg font-bold text-foreground mb-4">Link de Cadastro</Text>

              {!generatedLink ? (
                <>
                  <Text className="text-sm text-muted mb-4">
                    Gere um link único para que o usuário possa se cadastrar diretamente no sistema.
                  </Text>
                  <ActionButton
                    title="Gerar Link de Cadastro"
                    icon="link"
                    onPress={handleGenerateLink}
                    fullWidth
                    size="lg"
                  />
                </>
              ) : (
                <>
                  <View className="bg-background rounded-xl p-4 border border-border mb-4">
                    <Text className="text-sm text-foreground" selectable>
                      {generatedLink}
                    </Text>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <ActionButton
                        title={linkCopied ? 'Copiado!' : 'Copiar Link'}
                        icon="doc.fill"
                        onPress={handleCopyLink}
                        variant={linkCopied ? 'secondary' : 'primary'}
                        fullWidth
                      />
                    </View>
                    <View className="flex-1">
                      <ActionButton
                        title="Novo Link"
                        icon="plus"
                        onPress={handleGenerateLink}
                        variant="outline"
                        fullWidth
                      />
                    </View>
                  </View>
                </>
              )}
            </View>

            <View className="bg-primary/10 rounded-xl p-4">
              <View className="flex-row items-start">
                <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-medium text-foreground">Como funciona</Text>
                  <Text className="text-xs text-muted mt-1">
                    1. Gere o link de cadastro{'\n'}
                    2. Envie para o usuário por e-mail ou WhatsApp{'\n'}
                    3. O usuário acessa e preenche seus dados{'\n'}
                    4. Você aprova o cadastro no painel
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'manual':
        return (
          <View className="px-4">
            <View className="bg-surface rounded-2xl p-4 mb-6">
              <Text className="text-lg font-bold text-foreground mb-4">Cadastro Manual</Text>

              <InputField
                label="Nome Completo *"
                placeholder="Nome do usuário"
                value={name}
                onChangeText={setName}
                leftIcon="person.fill"
              />

              <InputField
                label="E-mail *"
                placeholder="email@exemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="message.fill"
              />

              <InputField
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                leftIcon="phone.fill"
              />

              <InputField
                label="Unidade/Setor"
                placeholder="Ex: Bloco A - Apt 101 ou Setor Comercial"
                value={unit}
                onChangeText={setUnit}
                leftIcon="building.2.fill"
              />

              <InputField
                label="Documento (CPF/CNPJ)"
                placeholder="000.000.000-00"
                value={document}
                onChangeText={setDocument}
                keyboardType="numeric"
                leftIcon="doc.fill"
              />

              <ActionButton
                title="Cadastrar Usuário"
                icon="checkmark"
                onPress={handleSaveManual}
                fullWidth
                size="lg"
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 py-4">
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
            className="flex-row items-center mb-4"
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
            <Text className="text-foreground font-medium ml-1">Voltar</Text>
          </Pressable>

          <Text className="text-2xl font-bold text-foreground">
            {selectedMethod ? registerOptions.find(o => o.key === selectedMethod)?.title : 'Cadastrar Usuários'}
          </Text>
          <Text className="text-base text-muted mt-1">
            {selectedMethod 
              ? registerOptions.find(o => o.key === selectedMethod)?.description 
              : 'Escolha o método de cadastro'}
          </Text>
        </View>

        {/* Content */}
        {!selectedMethod ? (
          <View className="px-4">
            {registerOptions.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => setSelectedMethod(option.key)}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className="bg-surface rounded-xl p-4 mb-3 flex-row items-center"
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center"
                  style={{ backgroundColor: `${option.color}20` }}
                >
                  <IconSymbol name={option.icon as any} size={24} color={option.color} />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-base font-semibold text-foreground">{option.title}</Text>
                  <Text className="text-xs text-muted mt-0.5">{option.description}</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.muted} />
              </Pressable>
            ))}
          </View>
        ) : (
          renderMethodContent()
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
