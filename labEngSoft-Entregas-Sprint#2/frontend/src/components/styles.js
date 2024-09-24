import styled from 'styled-components';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// Colors
export const Colors = {
    lightGreen: '#8DBF4D',
    darkGreen: '#6A8F39',
    white: '#FDFDFD',
    grayOne: '#D9D9D9',
    grayTwo: '#E6E6E6',
    grayThree: '#B3B3B3',
    black: '#000000',
    red: '#DB4437',
    blue: '#4285F4'
};

const { lightGreen, darkGreen, white, grayOne, grayTwo, grayThree, black, red, blue } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 50}px;
    background-color: ${white};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const FormContainer = styled.View`
    border-width: 1px;
    border-radius: 8px;
    border-color: ${black};
    width: 100%;
    align-items: center;
    margin: 10px;
    margin-bottom: 50px;
`;

export const FormTitle = styled.View`
    justify-content: center;
    background-color: ${darkGreen};
    width: 100%;
    height: 10%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 10px;
`;

export const FormTitleContent = styled.Text`
    color: ${white};
    font-weight: bold;
    text-align: center;
    font-size: 25px;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 5px;
    justify-content: center;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 45%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    color: ${lightGreen};
    padding: 10px;   

    ${(props) => props.welcome && `
        font-size: 20px;
    `}
`;

export const PageSubTitle = styled.Text`
    font-size: 20px;
    text-align: center;
    color: ${lightGreen};
    padding: 5px;  
    margin-bottom: 10px; 

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
        font-size: 17px;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${grayTwo};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${black};
`;

export const StyledInputLabel = styled.Text`
    color: ${black};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 10px;
    top: 35px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 10px;
    top: 35px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${darkGreen};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${lightGreen};
        flex-direction: row;
        justify-content: space-around;
    `}

`;

export const ButtonText = styled.Text`
    color: ${white};
    font-size: 16px;
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 15px;
    margin-top: 25px;
    margin-bottom: 15px;
    color: ${props => props.type == 'SUCCESS' ? green : red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${grayOne};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${black};
    font-size: 15px;
    margin-right: 5px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${blue};
    font-size: 15px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    right: 5px;
    top: 170px;
    position: absolute;
    z-index: 1;
    margin-top: 5px;
`;

export const ForgotPasswordContent = styled.Text`
    color: ${blue};
    font-size: 14px;
`;

// export const ThermsAndPolitics = styled.View`
//     width: 100%;
//     height: 5%;
//     flex-direction: row;
//     align-items: center;
//     margin-top: 5px;
// `;

// export const CheckboxContainer = styled.TouchableOpacity`
//     align-items: left;
// `;

// export const CheckBoxLink = styled.TouchableOpacity`
//     justify-content: center;
//     align-items: center;
// `;

// export const CheckboxLabel = styled.Text`
//   font-size: 14px;
//   margin-left: 5px;
//   color: ${black};
// `;