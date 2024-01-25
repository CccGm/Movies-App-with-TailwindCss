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

const MovieScreen = ({props}) => {
  var {width, height} = Dimensions.get('window');
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : 'mt-3';
  const {item} = useRoute();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similer, setSimiler] = useState([1, 2, 3, 4, 5]);
  let movieName = 'ant man the wasip : ant man the movies';

  useEffect(() => {
    //call api
  }, [item]);

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

        <View>
          <Image
            source={require('../assets/images/moviePoster2.png')}
            style={{width, height: height * 0.5}}
            // className="rounded-3xl"
          />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{width, height: height * 0.4}}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {/* movies Details */}

      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movieName}
        </Text>

        {/* ststus , release , runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released . 2020 .170 min
        </Text>

        {/* gemres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action .
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrile .
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comady
          </Text>
        </View>

        {/* discription  */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Hello there this is antmovie now that is start at 5 pm so be ready to
          watch , now this movies size is 150 min so be resy to watch and be
          prepaire your net Hello there this is antmovie now that is start at 5
          pm so be ready to watch , now this movies size is 150 min so be resy
          to watch and be prepaire your net Hello there this is antmovie now
          that is start at 5 pm so be ready to watch , now this movies size is
          150 min so be resy to watch and be prepaire your net Hello there this
          is antmovie now that is start at 5 pm so be ready to watch , now this
          movies size is 150 min so be resy to watch and be prepaire your net
          Hello there this is antmovie now that is start at 5 pm so be ready to
          watch , now this movies size is 150 min so be resy to watch and be
          prepaire your net
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
