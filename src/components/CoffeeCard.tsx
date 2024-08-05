import React from 'react'
import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BGIcon from './BGIcon'


const CARD_WIDTH = Dimensions.get('window').width*0.32

interface CoffeeCardProps{
    id: string;
    index: number;
    type: string;
    rosted: string;
    imagelink_square: ImageProps;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard : React.FC<CoffeeCardProps> = ({
    id,
    index,
    type,
    rosted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}) => {
  return (
    <LinearGradient
        start={{x:0, y:0}}
        end={{x:1, y:1}}
        style={styles.CardLinearGradientContainer}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground
            source={imagelink_square}
            style={styles.CardImageBG}
            resizeMode="cover">
                <View style={styles.CardRatingContainer}>
                    <CustomIcon 
                    name={'star'} 
                    color={COLORS.primaryOrangeHex} 
                    size={FONTSIZE.size_18}
                    />
                    <Text style={styles.CardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>

            <Text>{name}</Text>
            <Text>{special_ingredient}</Text>

            <View style={styles.CardFooterRow}>
                <Text>
                     $ <Text>{price.price}</Text>
                </Text>
                <TouchableOpacity>
                  <BGIcon
                      color={COLORS.primaryWhiteHex} 
                      name={'add'}
                      BGColor={COLORS.primaryOrangeHex}
                      size={FONTSIZE.size_10}
                    
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
  )
}


const styles = StyleSheet.create({
    CardLinearGradientContainer:{},
    CardImageBG:{
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom:SPACING.space_15,
        overflow:'hidden',
    },
    CardRatingContainer:{
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent:'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right:0,
    },
    CardRatingText:{
        fontFamily:FONTFAMILY.poppins_medium,
        color:COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    CardFooterRow:{
      fontFamily: FONTFAMILY.poppins_medium,
      color: COLORS.primaryWhiteHex,
      lineHeight: 22,
      fontSize: FONTSIZE.size_14,
    },
})
export default CoffeeCard