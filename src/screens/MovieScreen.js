import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import CastList from '../components/CastList';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviesDb';

const MovieScreen = props => {
  var {width, height} = Dimensions.get('window');
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : 'mt-3';
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [movies, setMovies] = useState({});
  const [similer, setSimiler] = useState([]);

  useEffect(() => {
    //call api
    setLoading(true);
    getMoviesDetails(props.route.params?.id);
    getMoviesCredits(props.route.params?.id);
    getSimilerMovies(props.route.params?.id);
  }, [props.route.params.id]);

  const getMoviesDetails = async id => {
    const data = await fetchMovieDetails(id);

    if (data) {
      setMovies(data);
    }
    setLoading(false);
  };
  const getMoviesCredits = async id => {
    const data = await fetchMovieCredits(id);

    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilerMovies = async id => {
    const data = await fetchSimilarMovies(id);

    if (data && data.results) {
      setSimiler(data.results);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row  justify-between items-center px-4 pt-3 pb-1' +
            topMargin
          }>
          <TouchableOpacity
            style={{backgroundColor: '#eab308'}}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size={35} color={isFavorite ? '#eab308' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movies?.poster_path) || fallbackMoviePoster,
              }}
              style={{width, height: height * 0.5}}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* {"adult": false, "backdrop_path": "/yOm993lsJyPmBodlYjgpPwBjXP9.jpg", "genre_ids": [35, 10751, 14], "id": 787699, "media_type": "movie", "original_language": "en", "original_title": "Wonka", "overview": "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.", "popularity": 3221.716, "poster_path": "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg", "release_date": "2023-12-06", "title": "Wonka", "video": false, "vote_average": 7.183, "vote_count": 1357} */}

      {/* movies Details */}

      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movies?.title}
        </Text>

        {/* ststus , release , runtime */}
        {movies?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movies?.status} . {movies?.release_date?.split('-')[0]} .
            {movies?.runtime} min
          </Text>
        ) : null}

        {/* gemres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movies?.genres?.map((geners, index) => {
            let showDot = index + 1 != movies.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {geners?.name}
                {showDot ? '.' : null}
              </Text>
            );
          })}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action .
          </Text>
          {/* <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrile .
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comady
          </Text> */}
        </View>

        {/* discription  */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movies?.overview}
        </Text>
      </View>

      {/* cast */}
      <CastList navigation={navigation} cast={cast} />
      {/* similer movies */}
      <MoviesList title={'Similer Movies'} hideSeeAll={true} data={similer} />
    </ScrollView>
  );
};

export default MovieScreen;
