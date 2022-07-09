import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Animated,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  FlatListProps,
  NativeScrollEvent,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";

const { width } = Dimensions.get("window");
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface CarouselProps
  extends Omit<FlatListProps<any>, "indicatorStyle" | "renderItem"> {
  carouselItem: FC<any>;
  data: Array<any>;
  showIndicators?: boolean;
  indicatorStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  autoScroll?: boolean;
}

const Carousel: FC<CarouselProps> = ({
  carouselItem: CarouselItem,
  data,
  showIndicators = true,
  indicatorStyle,
  autoScroll = false,
  style,
  ...others
}) => {
  const colors = useThemeColors();
  const ScrollX = new Animated.Value(0);
  const position = Animated.divide(ScrollX, width);
  const carouselRef = useRef<FlatList>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleScroll({ nativeEvent }: { nativeEvent: NativeScrollEvent }) {
    ScrollX.setValue(nativeEvent.contentOffset.x);
    const index = nativeEvent.contentOffset.x / width;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  }

  useEffect(() => {
    if (autoScroll) {
      timerRef.current = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollToIndex({
            index: currentIndex === data.length - 1 ? 0 : currentIndex + 1,
            animated: true,
          });
        }
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [data, autoScroll, currentIndex]);

  return (
    <View style={style}>
      <AnimatedFlatList
        {...others}
        horizontal
        pagingEnabled
        scrollEnabled
        data={data}
        keyExtractor={(_item, index) => String(index)}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => <CarouselItem data={item} />}
        ref={carouselRef}
      />
      {showIndicators && data.length > 1 && (
        <View
          style={[
            styles.dotsWrapper,
            { backgroundColor: colors.white },
            indicatorStyle,
          ]}
        >
          {data.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dots,
                {
                  opacity: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                  }),
                  backgroundColor: colors.black,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  dotsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dots: {
    height: 6,
    width: 6,
    margin: 7,
    borderRadius: 4,
  },
});
