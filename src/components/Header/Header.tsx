import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import styled from 'styled-components';
import useThemeColors from '../../constant/useColor';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import CustomText from '../Text/Text';

export interface HeaderProps {
  title?: string;
  showNotification?: boolean;
  isGoBack?: boolean;
}
export default function Header({
  title,
  showNotification = false,
  isGoBack = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const colors = useThemeColors();

  return (
    <HeaderContainer
      theme={{
        background: colors.primary,
      }}>
      <Container>
        {isGoBack && (
          <IconLeft
            hitSlop={15}
            onPress={() => {
              if (isGoBack) {
                navigation.goBack();
              }
            }}>
            <FontAwesomeIcon icon={faAngleLeft} color={'#fff'} size={20} />
          </IconLeft>
        )}
        {title?.length != 0 && (
          <TitleContainer>
            <HeaderTitle adjustsFontSizeToFit={true}>{title}</HeaderTitle>
          </TitleContainer>
        )}
        {showNotification && (
          <IconRight hitSlop={15}>
            <FontAwesomeIcon icon={faBell} color={'#fff'} size={20} />
          </IconRight>
        )}
      </Container>
    </HeaderContainer>
  );
}
const HeaderContainer = styled(SafeAreaView)`
  background-color: ${props => props.theme.background};
  height: ${Platform.OS === 'android' ? '60px' : 'auto'};
  justify-content:center;
`;
const Container = styled(View)`
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
  top: 0;
`;
const IconLeft = styled(TouchableOpacity)`
  position: absolute;
  left: 20px;
`;
const IconRight = styled(TouchableOpacity)`
  position: absolute;
  right: 20px;
`;
const TitleContainer = styled(View)`
  position: absolute;
`;
const HeaderTitle = styled(CustomText)`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;
