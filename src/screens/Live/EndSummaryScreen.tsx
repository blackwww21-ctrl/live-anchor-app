import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { LiveApi } from '../../api/liveApi';

type Props = NativeStackScreenProps<RootStackParamList, 'EndSummary'>;

const EndSummaryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await LiveApi.getRoomSummary(roomId);
        setSummary(res.data);
      } catch (e) {
        console.warn('获取总结失败', e);
      }
    };
    fetchSummary();
  }, [roomId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>直播已结束</Text>
      {summary && (
        <>
          <Text>观看人数：{summary.viewCount}</Text>
          <Text>最高在线：{summary.peakOnline}</Text>
          <Text>互动次数：{summary.interactCount}</Text>
          <Text>下单数量：{summary.orderCount}</Text>
        </>
      )}
      <View style={{ marginTop: 24 }}>
        <Button title="返回登录" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })} />
      </View>
    </View>
  );
};

export default EndSummaryScreen;
