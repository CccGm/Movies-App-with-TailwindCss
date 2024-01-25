import React from 'react';
import {SafeAreaView} from 'react-native';
import Navigations from './src/navigation/Navigations';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigations />
    </SafeAreaView>
  );
}
export default App;
