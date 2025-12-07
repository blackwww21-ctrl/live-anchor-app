import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AuthApi } from '../../api/authApi';
import { useUserStore } from '../../store/userStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('1234'); // Demo 用固定验证码
  const setUser = useUserStore(s => s.setUser);

  const onLogin = async () => {
    try {
      const res = await AuthApi.loginByPhone(phone, code);
      const { userId, token } = res.data;
      setUser({ userId, token });
      navigation.replace('Prelive');
    } catch (e) {
      console.warn('登录失败', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>手机号登录</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="请输入手机号"
        keyboardType="phone-pad"
        style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 8 }}
      />
      <Button title="登录" onPress={onLogin} />
    </View>
  );
};

export default LoginScreen;
