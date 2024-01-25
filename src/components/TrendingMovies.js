import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {image500} from '../api/moviesDb';

var {width, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  // {
  //   "adult": false,
  //   "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
  //   "genre_ids": [
  //     18,
  //     80
  //   ],
  //   "id": 278,
  //   "original_language": "en",
  //   "original_title": "The Shawshank Redemption",
  //   "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
  //   "popularity": 121.863,
  //   "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  //   "release_date": "1994-09-23",
  //   "title": "The Shawshank Redemption",
  //   "video": false,
  //   "vote_average": 8.711,
  //   "vote_count": 25404
  // },

  const navigation = useNavigation();

  const handelClick = item => {
    navigation.navigate('Movie', item);
  };

  const MoviesCard = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => handelClick(item)}>
        <Image
          source={{uri: image500(item.poster_path)}}
          style={{width: width * 0.6, height: height * 0.4}}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">TrendingMovies</Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MoviesCard item={item} handelClick={() => handelClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
};

export default TrendingMovies;
