import {View, Dimensions} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const Loading = () => {
  var {width, height} = Dimensions.get('window');
  return (
    <View
      className="absolute flex-row justify-center items-center"
      style={{height, width}}>
      <Progress.CircleSnail thickness={12} size={160} color={'#eab308'} />
    </View>
  );
};

export default Loading;
