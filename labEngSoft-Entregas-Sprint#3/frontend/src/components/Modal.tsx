import { Modal as RNModal, ModalProps } from "react-native";
import { ModalContentStyledContainer } from "./styles";

type PROPS = ModalProps & {
    isOpen: boolean
};

export const Modal = ({ isOpen, children, ...rest }: PROPS) => {
    const content = (
        <ModalContentStyledContainer>
            {children}
        </ModalContentStyledContainer>
    );

    return (

        <RNModal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>

    );
};