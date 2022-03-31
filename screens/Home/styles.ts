import styled from "styled-components/native";
import theme from "../../styles/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

// import { withTheme } from "styled-components";

export const Container = styled.KeyboardAvoidingView`
  /* flex: 1; */
  background-color: ${({ theme }) => theme.colors.bg_primary};
  padding: 24px;
  justify-content: space-between;
  height: 100%;
`;

export const Header = styled.View`
  width: 100%;
  /* height: ${hp("30%")}px; */
  /* background-color: ${({ theme }) => theme.colors.header}; */
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.text};
`;
export const HeaderDescription = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  line-height: 24px;
  margin-top: 16px;
`;

export const MainContent = styled.View`
  height: ${hp("60%")}px;
`;

export const CountryContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(60)}px;
  border-color: ${({ theme }) => theme.colors.text_detail};
  border-radius: 5px;
  /* border-width: 1px; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CountryFlagWrapper = styled.View`
  width: 30%;
  height: 100%;
  padding: 10px;
`;

export const CountryNameWrapper = styled.View`
  width: 50%;
  height: 100%;
  justify-content: space-evenly;
  padding: 10px 0px;
`;

export const CountryName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.text};
`;
export const CountryRegion = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.text_detail};
`;

export const IconsWrapper = styled.View`
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const PinWrapper = styled.TouchableOpacity``;

export const Divider = styled.View`
  width: 100%;
  height: 1;
  opacity: 0.2;
  background-color: ${({ theme }) => theme.colors.text_detail};
`;

export const CountryFilter = styled.View`
  width: 100%;
  /* height: 50px; */
  flex-direction: row;
  padding: 5px;
  align-items: center;
`;
export const FilterInput = styled.TextInput`
  flex: 1;
  border-color: ${({ theme }) => theme.colors.line};
  border-width: 2px;
  border-radius: 5px;
  padding-left: 10px;
  height: 40px;
`;
export const FilterIconWrapper = styled.View`
  width: 40;
  padding: 5px;
`;
