import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  Container,
  CountryContainer,
  CountryFilter,
  CountryFlagWrapper,
  CountryName,
  CountryNameWrapper,
  CountryRegion,
  Divider,
  FilterIconWrapper,
  FilterInput,
  Header,
  HeaderDescription,
  HeaderTitle,
  IconsWrapper,
  MainContent,
  PinWrapper,
} from "./styles";
// import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/images/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import axios from "axios";
import { http } from "../../services/http";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import BigList from "react-native-big-list";

interface CountryProps {
  imgUrl: string;
  countryName: string;
  countryRegion: string;
}

export default function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [countriesData, setCountriesData] = useState([]);
  const [focus, setFocus] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef();

  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    fecthAllCountries();

    // const handleBack=()=> {
    //   if (focus) {
    //     inputRef.current.blur()
    //     return true;
    //   }

    //   if (!focus) {
    //     return false;
    //   }
    // }

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   handleBack,
    // );

    // return () => {
    //   backHandler.remove();
    //   listener.remove();
    // };
  }, []);

  function filterCountries() {
    const data = countriesData.filter((country) => {
      let name = country.name.common;
      let translatedName = country.translations.por.common;
      let region = country.region;
      let searched = searchInput.trim();
      return (
        !searchInput ||
        name.toLowerCase().includes(searched.toLowerCase()) ||
        translatedName.toLowerCase().includes(searched.toLowerCase()) ||
        region.toLowerCase().includes(searched.toLowerCase())
      );
    });
    setFilteredArray(data);
  }

  useEffect(() => {
    filterCountries();
  }, [searchInput]);

  const handleFocus = () => {
    if (!focus) setFocus(true);
  };

  const handleUnFocus = () => {
    setFocus(false);
    inputRef.current.blur();
    // Keyboard.dismiss();
  };

  //function to load all countries
  const fecthAllCountries = async () => {
    http
      .get("/all")
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        setCountriesData(res.data);
        setFilteredArray(res.data);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setFetching(false));
  };

  const getItemLayout = (data: any, index: number) => ({
    length: index,
    offset: index,
    index,
  });

  //function to handle country selection
  const handleCountrySelection = (country: string) => {
    const selectedCountry = filteredArray.filter(
      (c: any) => c.translations.por.common === country
    );
    // console.log(selectedCountry);
    navigation.navigate("CountryDetails", { selectedCountry } as any);
    handleUnFocus();
  };

  //country Component
  const renderItem = ({ item, index }: any) => {
    return (
      <Animatable.View
        useNativeDriver
        animation="fadeInRight"
        delay={100 + index}
      >
        <Country
          key={item.translations.por.common}
          countryName={item.translations.por.common}
          countryRegion={item.region}
          imgUrl={item.flags.png}
        />
      </Animatable.View>
    );
  };

  const Country = ({ imgUrl, countryName, countryRegion }: CountryProps) => {
    return (
      <CountryContainer onPress={() => handleCountrySelection(countryName)}>
        <CountryFlagWrapper>
          <Image
            source={{ uri: imgUrl }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </CountryFlagWrapper>
        <CountryNameWrapper>
          <CountryName>{countryName}</CountryName>
          <CountryRegion>{countryRegion}</CountryRegion>
        </CountryNameWrapper>
        <IconsWrapper>
          <PinWrapper>
            <MaterialCommunityIcons
              name="pin-outline"
              size={24}
              color={theme.colors.text_detail}
            />
          </PinWrapper>
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={theme.colors.text_detail}
          />
        </IconsWrapper>
      </CountryContainer>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleUnFocus}>
      <Container behavior="padding">
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor={"transparent"}
            translucent
          />
          <Header>
            <Animatable.View
              useNativeDriver
              animation={focus ? "flipInY" : "flipInX"}
            >
              {focus ? (
                <HeaderTitle>Pesquisar {"\n"}o País</HeaderTitle>
              ) : (
                <HeaderTitle>Selecione {"\n"}o País</HeaderTitle>
              )}
            </Animatable.View>

            {!focus && (
              <Animatable.View
                useNativeDriver
                animation={focus ? "fadeOut" : "fadeInDown"}
              >
                <HeaderDescription>
                  Escolha o pais para ver seus detalhes como nome, capital,
                  região, sub-região, população, área, fuso horário, nome
                  nativo.
                </HeaderDescription>
              </Animatable.View>
            )}
          </Header>
          <CountryFilter>
            <>
              <FilterInput
                // autoFocus={true}
                autoCorrect={false}
                onFocus={handleFocus}
                onBlur={handleUnFocus}
                onChangeText={setSearchInput}
                value={searchInput}
                ref={inputRef}
              />
            </>
            <FilterIconWrapper>
              <Ionicons
                name="search"
                size={24}
                color={theme.colors.text_detail}
              />
            </FilterIconWrapper>
          </CountryFilter>
          <MainContent>
            {fetching ? (
              <ActivityIndicator color={theme.colors.header} size="large" />
            ) : (
              <BigList
                keyboardShouldPersistTaps={"handled"}
                data={filteredArray}
                // initialNumToRender={20}
                keyExtractor={(item) => String(item.translations.por.common)}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={renderItem}
                // maxToRenderPerBatch={1}
                // disableVirtualization
                // windowSize={10}
                // removeClippedSubviews={false}
                // getItemLayout={getItemLayout}
              />
            )}
          </MainContent>
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
