import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ViewerCard = ({ viewer = {}, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(viewer)}>
      <View style={styles.avatarPlaceholder}>
        {/* Could use <Image> if avatar provided */}
        <Text style={styles.avatarText}>{(viewer.name || '')[0] || '?'}</Text>
      </View>
      <Text style={styles.name}>{viewer.name || '未知用户'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  name: {
    color: '#fff',
  },
});

export default ViewerCard;