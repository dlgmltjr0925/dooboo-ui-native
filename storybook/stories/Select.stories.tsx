import React, { useCallback, useState } from 'react';
import Select, { ThemeEnum } from '../../src/components/shared/Select';
import { boolean, number, object, select, text } from "@storybook/addon-knobs";

import { ContainerDeco } from '../decorators';
import { Dimensions } from 'react-native';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

interface Item {
  value: string;
  text: string;
}
const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const ITEMS = [
  { value: 'Category1', text: 'Category1' },
  { value: 'Category2', text: 'Category2' },
  { value: 'Category3', text: 'Category3' },
  { value: 'Category4', text: 'Category4' },
  { value: 'Category5', text: 'Category5' },
  { value: 'Category6', text: 'Category6' },
  { value: 'Category7', text: 'Category7' },
  { value: 'Category8', text: 'Category8' },
  { value: 'Category9', text: 'Category9' },
];

function Default(): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<Item>(null);
  const onSelect = useCallback(
    (item: Item) => {
      setSelectedItem(item);
    },
    [selectedItem],
  );
  return (
    <Container>
      <Select items={ITEMS} onSelect={onSelect} selectedItem={selectedItem}/>
    </Container>
  );
}

const HEIGHT = Dimensions.get('screen').height;

const CustomContainer = styled.SafeAreaView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const StyledScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  height: ${HEIGHT / 4};
`;

const SelectContainer = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SelectThemeText = styled.Text`
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: bold;
`;

const GROUP_ID = 'CUSTOM_PROPS';

function CustomProps(): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<Item>(null);
  const onSelect = useCallback(
    (item: Item) => {
      action(`${GROUP_ID}: onSelect`);
      setSelectedItem(item);
    },
    [selectedItem],
  );
  const onShow = (): void => {
    action(`${GROUP_ID}: onShow`);
  };
  const onDismiss = (): void => {
    action(`${GROUP_ID}: onDismiss`);
  };

  const title = text('title', 'title', GROUP_ID);
  const titleTextStyle = object('titleTextStyle', {}, GROUP_ID);
  const theme = select('theme', ThemeEnum, ThemeEnum.none, GROUP_ID);
  const rootViewStyle = object('rootViewStyle', {}, GROUP_ID);
  const rootTextStyle = object('rootTextStyle', {}, GROUP_ID);
  const placeholder = text('placeholder', 'placeholder', GROUP_ID);
  const activeOpacity = number('activeOpacity', 0.5, { range: true, min: 0, max: 1, step: 0.1 }, GROUP_ID);
  const disabled = boolean('disabled', false, GROUP_ID);
  const itemStyle = object('itemStyle', { list: {}, defaultItem: {}, selectedItem: {} }, GROUP_ID);
  const props = {
    title,
    titleTextStyle,
    theme,
    rootViewStyle,
    rootTextStyle,
    placeholder,
    activeOpacity,
    disabled,
    items: ITEMS,
    itemStyle,
    onSelect,
    selectedItem,
    onShow,
    onDismiss,
  };
  return (
    <CustomContainer>
      <StyledScrollView>
        <RowContainer>
          <SelectContainer>
            <SelectThemeText>Theme : default</SelectThemeText>
            <Select {...props} />
          </SelectContainer>
        </RowContainer>
        <RowContainer>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.blank}`}</SelectThemeText>
            <Select {...props} theme={ThemeEnum.blank}/>
          </SelectContainer>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.none}`}</SelectThemeText>
            <Select {...props} theme={ThemeEnum.none}/>
          </SelectContainer>
        </RowContainer>
        <RowContainer>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.box}`}</SelectThemeText>
            <Select {...props} theme={ThemeEnum.box}/>
          </SelectContainer>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.underbar}`}</SelectThemeText>
            <Select {...props} theme={ThemeEnum.underbar}/>
          </SelectContainer>
        </RowContainer>
      </StyledScrollView>
    </CustomContainer>
  );
}

storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (<Default />))
  .add('custom props', () => <CustomProps />);
