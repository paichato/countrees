import { View, Text, StatusBar, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Container,
  CountryContainer,
  CountryFlagWrapper,
  CountryName,
  CountryNameWrapper,
  CountryRegion,
  Divider,
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

interface CountryProps {
  imgUrl: string;
  countryName: string;
  countryRegion: string;
}

export default function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fecthAllCountries();
  }, []);

  const fecthAllCountries = async () => {
    http
      .get("/all")
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        setCountriesData(res.data);
      })
      .catch((error) => console.log(error.response.data.message));
  };

  const handleCountrySelection = (country: string) => {
    const selectedCountry = countriesData.filter(
      (c: any) => c.translations.por.common === country
    );
    // console.log(selectedCountry);
    navigation.navigate("CountryDetails", { selectedCountry });
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
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent
      />
      <Header>
        <HeaderTitle>Selecione {"\n"}o País</HeaderTitle>
        <HeaderDescription>
          Escolha o pais para ver seus detalhes como nome, capital, região,
          sub-região, população, área, fuso horário, nome nativo.
        </HeaderDescription>
      </Header>

      <MainContent>
        <CountryContainer>
          <CountryFlagWrapper></CountryFlagWrapper>
          <CountryNameWrapper>
            <CountryName>Mozambique</CountryName>
            <CountryRegion>Africa</CountryRegion>
          </CountryNameWrapper>
          <IconsWrapper>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.text_detail}
            />
          </IconsWrapper>
        </CountryContainer>

        <FlatList
          data={countriesData}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }: any) => (
            <Country
              countryName={item.translations.por.common}
              countryRegion={item.region}
              imgUrl={item.flags.png}
            />
          )}
        />
      </MainContent>
    </Container>
  );
}
