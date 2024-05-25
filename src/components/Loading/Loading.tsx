import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import useThemeColors from '../../constant/useColor';

export default function Loading({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="small" color={useThemeColors().primary} />
    </View>
  ) : (
    <>{children}</>
  );
}
