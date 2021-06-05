import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Providers from './src/navigation';
import { ModalPortal } from 'react-native-modals';
import { SIZES } from './src/constants';
export default function App() {
  return (
    <SafeAreaProvider style={styles}>
      <ThemeProvider>
        <Providers />
        <ModalPortal />
      </ThemeProvider>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
