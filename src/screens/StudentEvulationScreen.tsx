import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/Navigation';
import Container from '../components/Container/Container';
import Loading from '../components/Loading/Loading';
import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import CustomText from '../components/Text/Text';
import IconButton from '../components/IconButton/IconButton';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import Questions from '../models/Questions';

export default function StudentEvulationScreen(
  props: NativeStackScreenProps<RootStackParamList, 'StudentEvulationScreen'>,
) {
  const RenderItem = ({item, index}: {item: Questions; index: number}) => {
    return (
      <ListItem
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 1.24,
          elevation: 3,
        }}
        onPress={() => {
          props.navigation.navigate('StudentsScreen', {
            classRoomId: item.id as string,
          });
        }}
        key={index}>
        <ListItemContainer>
          <CustomText color="grey">Sınıf Adı:</CustomText>
          <CustomText color="grey">{item.name}</CustomText>
        </ListItemContainer>
        <ListItemButtonContainer>
          <IconButton icon={faTrash}></IconButton>
          <IconButton icon={faPen} onPress={() => {}}></IconButton>
        </ListItemButtonContainer>
      </ListItem>
    );
  };
  return (
    <Container p={10} goBackShow header title="Değerlendirme Soruları">
      <Loading>
        <ListContainer>
          <CustomFlatList
            notFoundText="Soru Bulunamadı."
            filter={(entity, value, index) => {
              return entity.name.toLowerCase().includes(value.toLowerCase());
            }}
            isSearchable
            data={[]}
            renderItem={RenderItem}
          />
        </ListContainer>
        <ButtonContainer>
          <Button
            borderRadius={10}
            text="Soru Ekle"
            onPress={() => {
              props.navigation.navigate('AddStudentEvulationScreen');
            }}></Button>
        </ButtonContainer>
      </Loading>
    </Container>
  );
}

const ListContainer = styled(View)`
  flex: 1;
  padding: 10px;
`;
const ButtonContainer = styled(View)`
  flex: 0.2;
  max-height: 50px;
  margin-bottom: 20px;
  justify-content: center;
  padding-horizontal: 10px;
`;
const ListItem = styled(TouchableOpacity)`
  background-color: #fff;
  padding: 15px;
  margin-horizontal: 2px;
  border-radius: 8px;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ListItemContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ListItemButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
`;
