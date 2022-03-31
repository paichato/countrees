import { View, Text, Image } from "react-native";
import React from "react";
import {
  BackButton,
  BannerContent,
  Container,
  ContainerWrapper,
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
import { jsonToCSV } from "react-native-csv";
import * as MediaLibrary from "expo-media-library";
import Papa from "papaparse";
import html_tablify from "html-tablify";
import * as Animatable from "react-native-animatable";

import * as XLSX from "xlsx";
import { writeFileXLSX } from "xlsx";

export default function CountryDetails() {
  // const { toCSV } = require('csv-json-convertor');
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedCountry }: any = route.params;

  // console.log("SELECTED COUNTRY:", selectedCountry);

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
  const handleDownloadCSV = async () => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
    };
    requestPermission();

    // var html_data = html_tablify.tablify({ data: selectedCountry });
    // console.log(html_data);

    // const newArray = [];
    // selectedCountry.map((c) => {
    //   newArray.push(Object.keys(c));
    // });

    const result = jsonToCSV(selectedCountry, {
      truncated: false,
    });
    console.log(result);

    let fileUri =
      FileSystem.documentDirectory + `${selectedCountry[0].name.common}.csv`;
    await FileSystem.writeAsStringAsync(fileUri, result, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);

    FileSystem.getContentUriAsync(fileUri).then((cUri) => {
      console.log(cUri);
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
      });
    });
  };

  const handleDownloadXLS = async () => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
    };
    requestPermission();
    // const result = jsonToCSV(selectedCountry, { delimiter: "," });
    // console.log(result);

    var html_data = html_tablify.tablify({ data: selectedCountry });
    console.log(html_data);

    // const newArray = [];
    // selectedCountry.map((c) => {
    //   newArray.push(Object.keys(c));
    // });

    // const new_workbook = XLSX.utils.book_new();
    // // console.log(new_workbook);

    // let worksheet = XLSX.utils.json_to_sheet(selectedCountry, {
    //   //   // header: newArray,
    // });
    // console.log(worksheet);
    // XLSX.utils.book_append_sheet(new_workbook, worksheet);
    // const result = XLSX.writeXLSX(new_workbook, {
    //   type: "base64",
    //   bookType: "xls",
    // });

    // const result = XLSX.utils.table_to_book(
    //   html_data.document.getElementById("tablify")
    // );
    // const sad = XLSX.utils.sheet_add_json(worksheet, selectedCountry);

    // const result = XLSX.utils.book_append_sheet(new_workbook, worksheet);
    // writeFileXLSX();

    // const result = html_data;

    const result = jsonToCSV(selectedCountry, {
      truncated: false,
    });

    let fileUri =
      FileSystem.documentDirectory + `${selectedCountry[0].name.common}.xlsx`;
    await FileSystem.writeAsStringAsync(fileUri, result, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);

    FileSystem.getContentUriAsync(fileUri).then((cUri) => {
      console.log(cUri);
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
      });
    });
  };

  const convertToCSV = () => {
    //the function bellow works
    // function JsonToCSV() {
    //   var array =
    //     typeof selectedCountry != "object"
    //       ? JSON.parse(selectedCountry)
    //       : selectedCountry;
    //   var str = "";
    //   for (var i = 0; i < array.length; i++) {
    //     var line = "";
    //     for (var index in array[i]) {
    //       if (line != "" ) line += ",";
    //       line += array[i][index];
    //     }
    //     str += line + "\r\n";
    //   }
    //   return str;
    // }
    // console.log(JSON.stringify(JsonToCSV(), null, 2));
    //it works
    // jsonToCsv2();
  };

  const jsonToCsv2 = () => {
    var keys = [];
    var values = [];
    function getKeys(data, k = "") {
      for (var i in data) {
        var rest = k.length ? "_" + i : i;
        if (typeof data[i] == "object") {
          if (!Array.isArray(data[i])) {
            getKeys(data[i], k + rest);
          }
        } else keys.push(k + rest);
      }
    }
    function getValues(data, k = "") {
      for (var i in data) {
        var rest = k.length ? "" + i : i;
        if (typeof data[i] == "object") {
          if (!Array.isArray(data[i])) {
            getValues(data[i], k + rest);
          }
        } else values.push(data[rest]);
      }
    }

    getKeys(selectedCountry[0]);
    var value = "";
    selectedCountry.forEach((x) => {
      values = [];
      getValues(x);
      value += values.join(";") + "\r\n";
    });

    let result = keys.join(";") + "\r\n" + value;
    console.log(result);
    return result;
  };

  const convertToXML = () => {
    let csvData = jsonToCSV(selectedCountry);
    // console.log(csvData);

    // csvData = jsonToCSV(csvData);

    csvData = csvData.split("\n").map((row) => row.trim());

    let headings = csvData[0].split(",");

    let xml = ``;

    for (let i = 1; i < csvData.length; i++) {
      let details = csvData[i].split(",");
      xml += "<countryData>\n";
      for (let j = 0; j < headings.length; j++) {
        xml += `<${headings[j]}>${details[j]}</${headings[j]}>
    `;
      }
      xml += "</countryData>\n";
    }

    console.log(xml);
    return xml;
  };

  const handleDownloadXML = async () => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
    };
    requestPermission();

    const result = convertToXML();
    console.log(result);

    let fileUri =
      FileSystem.documentDirectory + `${selectedCountry[0].name.common}.xml`;
    await FileSystem.writeAsStringAsync(fileUri, result, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);

    FileSystem.getContentUriAsync(fileUri).then((cUri) => {
      console.log(cUri);
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
      });
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
      <ContainerWrapper showsVerticalScrollIndicator={false}>
        <Joiner>
          <Image
            source={{ uri: selectedCountry[0].flags.png }}
            style={{ height: 40, width: 50, resizeMode: "contain" }}
          />
          <HugeText>{selectedCountry[0]?.name?.common}</HugeText>
        </Joiner>
        <Spacer />
        <Spacer />

        <Title>Nome nativo do país</Title>
        <Wrapper bg>
          <Description>{selectedCountry[0]?.name?.official}</Description>
        </Wrapper>
        <BannerContent>
          <Wrapper>
            <Description>Capital</Description>
            <Title>
              {selectedCountry[0]?.capital[0]
                ? selectedCountry[0]?.capital[0]
                : selectedCountry[0]?.capital}
            </Title>
          </Wrapper>
          <HorizontalDivider />
          <RightWrapper>
            <Description>População </Description>

            <HugeText>{selectedCountry[0]?.population}</HugeText>
          </RightWrapper>
        </BannerContent>

        <Wrapper bg>
          <Description>{"Região: " + selectedCountry[0]?.region}</Description>
        </Wrapper>
        <BannerContent>
          <Wrapper>
            <Description>Sub região</Description>
            <Title>{selectedCountry[0]?.subregion}</Title>
          </Wrapper>
          <HorizontalDivider />
          <RightWrapper>
            <Description>Fuso Horário</Description>
            {selectedCountry[0]?.timezones?.map((c) => (
              <HugeText>{c}</HugeText>
            ))}
          </RightWrapper>
        </BannerContent>

        <Wrapper bg></Wrapper>
        <BannerContent>
          <Wrapper>
            <Description>Prefixo</Description>
            <Title>
              {selectedCountry[0]?.idd?.root +
                selectedCountry[0]?.idd?.suffixes[0]}
            </Title>
          </Wrapper>
          <HorizontalDivider />
          <RightWrapper>
            <Description>Área</Description>
            <HugeText>{selectedCountry[0]?.area}</HugeText>
          </RightWrapper>
        </BannerContent>
        <Wrapper bg></Wrapper>
        <Animatable.View animation="fadeInUp" delay={200}>
          <ExportButton onPress={handleDownloadCSV}>
            <WhiteTitle>Exportar CSV</WhiteTitle>
          </ExportButton>
        </Animatable.View>
        <Spacer />
        <Animatable.View animation="fadeInUp" delay={400}>
          <ExportButton onPress={handleDownloadXML}>
            <WhiteTitle>Exportar XML</WhiteTitle>
          </ExportButton>
        </Animatable.View>
        <Spacer />
        <Animatable.View animation="fadeInUp" delay={600}>
          <ExportButton onPress={handleDownloadXLS}>
            <WhiteTitle>Exportar XLS</WhiteTitle>
          </ExportButton>
        </Animatable.View>
      </ContainerWrapper>
    </Container>
  );
}
