import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container/Container';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faClose,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../constant/useColor';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/Navigation';
import {homeMenu} from '../data/data';
import Button from '../components/Button/Button';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase/config';
import {ScrollView} from 'react-native-gesture-handler';
import Input from '../components/Input/Input';
import ClassRoomRepository from '../repositories/ClassRoomRepository';
import ClassRoom from '../models/ClassRoom';
import IconButton from '../components/IconButton/IconButton';
import Loading from '../components/Loading/Loading';

const HomeScreen = (
  props: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>,
) => {
  const classRoomRepo = ClassRoomRepository.getInstance();
  const colors = useThemeColors();

  const [loading, setLoading] = useState(false);
  const [searchStudent, setSearchStudent] = useState('');
  const [focusToSearch, setFocusToSearch] = useState(false);
  const [searchStudents, setSearchStudents] = useState<Array<ClassRoom>>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  return (
    <Container title="Anasayfa" header showNotification>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.background,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <HomeTopContainer>
          <View style={{flex: 1}}>
            <Input
              autoCapitalize="none"
              id="searchStudent"
              placeholder="Öğrenci Ara"
              icon={faSearch}
              value={searchStudent}
              onChangeText={search => {
                if (search.length === 0) {
                  setSearchStudents([]);
                }
                setSearchStudent(search);
              }}
              onSubmitEditing={async () => {
                setSearchLoading(true);
                const result =
                  await classRoomRepo.getStudentByStudentNameForQuery(
                    searchStudent,
                  );
                setSearchLoading(false);
                setSearchStudents(result);
              }}
              onFocus={() => {
                if (searchStudent.length === 0 && searchStudents.length !== 0) {
                  setSearchStudents([]);
                }
                setFocusToSearch(true);
              }}
              inputMode="search"
              onBlur={() => {
                if (searchStudent === '' && searchStudents.length === 0) {
                  setFocusToSearch(false);
                }
              }}
            />
          </View>
          {focusToSearch && (
            <IconButton
              onPress={() => {
                setSearchStudent('');
                setSearchStudents([]);
                setFocusToSearch(false);
              }}
              icon={faClose}></IconButton>
          )}
          {/* <HomeWidgets /> */}
        </HomeTopContainer>
        {focusToSearch ? (
          <Loading loading={searchLoading}>
            {searchStudents.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {}}>
                <MenuItem>
                  <CustomText fontSizes="h5" color="primaryText">
                    {item.name}
                  </CustomText>
                  <MenuItemButton>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      color={colors.iconColor}
                      size={20}
                    />
                  </MenuItemButton>
                </MenuItem>
              </TouchableOpacity>
            ))}
          </Loading>
        ) : (
          <HomeBottomContainer>
            {homeMenu.map((item, index) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate(item?.link as any)}
                key={index}>
                <MenuItem>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {item?.icon}
                    <CustomText fontSizes="h5" color="primaryText" center>
                      {item.name}
                    </CustomText>
                  </View>
                  <MenuItemButton>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      color={colors.iconColor}
                      size={20}
                    />
                  </MenuItemButton>
                </MenuItem>
              </TouchableOpacity>
            ))}
            <LogoutButton>
              <Button
                loading={loading}
                text="Çıkış Yap"
                onPress={() => {
                  setLoading(true);
                  signOut(auth)
                    .then(() => {
                      props.navigation.navigate('LoginScreen');
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
              />
            </LogoutButton>
          </HomeBottomContainer>
        )}
      </ScrollView>
    </Container>
  );
};
const HomeBottomContainer = styled(View)``;
const HomeTopContainer = styled(View)`
  margin-horizontal: 10px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const MenuItem = styled(View)`
  flex-direction: row;
  padding-vertical: 10px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-horizontal: 10px;
  margin-top: 10px;
  padding-right: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #ddd;
`;
const MenuItemButton = styled(TouchableOpacity)``;
const LogoutButton = styled(View)`
  margin-vertical: 10px;
  margin-horizontal: 10px;
`;
export default HomeScreen;
