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
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {debounce} from 'lodash';
import {fallbackMoviePoster, image185, searchMovies} from '../api/moviesDb';

const SearchScreen = () => {
  var {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-us',
        page: '1',
      }).then(data => {
        setLoading(false);
        if (data && data.results) setResult(data.results);
      });
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 mt-3 flex-row justify-between items-center  border border-neutral-500 rounded-full">
        <TextInput
          value={searchValue}
          onChangeText={e => {
            handleTextDebounce(e);
            setSearchValue(e);
          }}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
        />
        <TouchableOpacity
          onPress={() => {
            handleTextDebounce('');
            setSearchValue('');
          }}
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
                      // source={require('../assets/images/moviePoster2.png')}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{width: width * 0.44, height: height * 0.3}}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
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
