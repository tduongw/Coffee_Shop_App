import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';



interface HeaderBarProps{
      title?:string;

}
const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderCotainer}>
      <GradientBGIcon name='menu' 
                      color={COLORS.primaryLightGreyHex} 
                      size={FONTSIZE.size_16}/>
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic/>
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderCotainer:{
      padding:SPACING.space_30,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',

    },
    HeaderText:{
      fontFamily:FONTFAMILY.poppins_semibold,
      fontSize:FONTSIZE.size_20,
      color:COLORS.primaryLightGreyHex,

    }


})


export default HeaderBar
