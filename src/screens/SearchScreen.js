import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';

const SearchScreen = () => {
  var {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const [result, setResult] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  let movieName = 'ant man the wasip';

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 mt-3 flex-row justify-between items-center  border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
        />
        <TouchableOpacity
          onPress={() => {}}
          className="rounded-full p-3 m-1 bg-neutral-500 ">
          <XMarkIcon size={25} color={'white'} />
        </TouchableOpacity>
      </View>

      {/* results */}
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({result.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate('Movie', item)}>
                  <View className="space-y-2 mb-4">
                    <Image
                      source={require('../assets/images/moviePoster2.png')}
                      style={{width: width * 0.44, height: height * 0.3}}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + '...'
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/movieTime.png')}
            // style={{width: width * 0.44, height: height * 0.3}}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
