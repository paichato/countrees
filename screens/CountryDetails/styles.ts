import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg_primary};
  padding: 24px;
  /* justify-content: space-between; */
  /* padding-top: 80px; */
`;

export const ContainerWrapper = styled.ScrollView``;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.text_detail};
`;
export const WhiteTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.bg_primary};
`;
export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.text_detail};
`;
export const HugeText = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.text_detail};
`;

export const Wrapper = styled.View`
  padding: 8px;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: ${({ theme, bg }) =>
    bg ? theme.colors.line : "transparent"};
`;
export const RightWrapper = styled.View`
  padding: 8px;
  /* background-color: rgba(0, 0, 0, 0.2); */
  /* background-color: ${({ theme }) => theme.colors.line}; */
  align-items: flex-end;
`;

export const HorizontalDivider = styled.View`
  height: 100%;
  width: 2px;
  background-color: ${({ theme }) => theme.colors.line}; ;
`;
export const Joiner = styled.ScrollView`
  flex-direction: row;
`;

export const BannerContent = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Spacer = styled.View`
  height: 16px;
`;

export const ExportButton = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.sucess};
  align-self: flex-end;
  align-items: center;
`;
export const BackButton = styled.TouchableOpacity`
  width: 40px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.line};
  /* align-self: flex-end; */
  align-items: center;
  justify-content: center;
`;
