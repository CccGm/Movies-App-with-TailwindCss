import {
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MoviesList from '../components/MoviesList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';

const ios = Platform.OS == 'ios';
const HomeScreen = () => {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : ' mb-3'}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgb(38 38 38)'}
        />
        <View className="flex-row justify-between items-center mx-4 mt-3">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
          <Text className="text-white text-3xl font-bold">Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* Trending Movies Crousel */}
          <TrendingMovies data={trending} />

          {/* upcoming movies row */}
          <MoviesList title={'Upcoming'} data={upcoming} />

          {/* topRated movies row */}
          <MoviesList title={'Top Rated'} data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
