import { View, Text, Image } from "react-native";
import React from "react";
import {
  BackButton,
  BannerContent,
  Container,
  Description,
  ExportButton,
  HorizontalDivider,
  HugeText,
  Joiner,
  RightWrapper,
  Spacer,
  Title,
  WhiteTitle,
  Wrapper,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

export default function CountryDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedCountry }: any = route.params;

  console.log("SELECTED COUNTRY:", selectedCountry);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
    FileSystem.downloadAsync(
      "http://techslides.com/demos/sample-videos/small.mp4",
      FileSystem.documentDirectory + "small.mp4"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);

        FileSystem.getContentUriAsync(uri).then((cUri) => {
          console.log(cUri);
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: cUri,
            flags: 1,
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Spacer />
      <Spacer />
      <BackButton onPress={handleGoBack}>
        <Feather
          name="chevron-left"
          size={24}
          color={theme.colors.text_detail}
        />
      </BackButton>
      <Spacer />
      <Joiner>
        <Image
          source={{ uri: selectedCountry[0].flags.png }}
          style={{ height: 40, width: 50, resizeMode: "contain" }}
        />
        <HugeText>{selectedCountry[0].name.common}</HugeText>
      </Joiner>
      <Spacer />
      <Spacer />

      <Title>Nome nativo do país</Title>
      <Wrapper bg>
        <Description>{selectedCountry[0].name.official}</Description>
      </Wrapper>
      <BannerContent>
        <Wrapper>
          <Description>Capital</Description>
          <Title>{selectedCountry[0].capital[0]}</Title>
        </Wrapper>
        <HorizontalDivider />
        <RightWrapper>
          <Description>População </Description>

          <HugeText>{selectedCountry[0].population}</HugeText>
        </RightWrapper>
      </BannerContent>

      <Wrapper bg>
        <Description>{"Região: " + selectedCountry[0].region}</Description>
      </Wrapper>
      <BannerContent>
        <Wrapper>
          <Description>Sub região</Description>
          <Title>{selectedCountry[0].subregion}</Title>
        </Wrapper>
        <HorizontalDivider />
        <RightWrapper>
          <Description>Fuso Horário</Description>
          {selectedCountry[0].timezones.map((c) => (
            <HugeText>{c}</HugeText>
          ))}
        </RightWrapper>
      </BannerContent>

      <Wrapper bg></Wrapper>
      <BannerContent>
        <Wrapper>
          <Description>Prefixo</Description>
          <Title>
            {selectedCountry[0].idd.root + selectedCountry[0].idd.suffixes[0]}
          </Title>
        </Wrapper>
        <HorizontalDivider />
        <RightWrapper>
          <Description>Área</Description>
          <HugeText>{selectedCountry[0].area}</HugeText>
        </RightWrapper>
      </BannerContent>
      <Wrapper bg></Wrapper>
      <ExportButton onPress={handleDownload}>
        <WhiteTitle>Exportar</WhiteTitle>
      </ExportButton>
      <Spacer />
      <ExportButton onPress={handleDownload}>
        <WhiteTitle>Exportar</WhiteTitle>
      </ExportButton>
      <Spacer />
      <ExportButton onPress={handleDownload}>
        <WhiteTitle>Exportar</WhiteTitle>
      </ExportButton>
    </Container>
  );
}
