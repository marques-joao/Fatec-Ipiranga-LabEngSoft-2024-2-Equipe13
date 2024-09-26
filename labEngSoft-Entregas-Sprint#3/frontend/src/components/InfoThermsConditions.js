import { InfoThermsContainer, InfoThermsContent, InfoThermsSubTitle, InfoThermsText, InfoThermsTitle } from "./styles";

const InfoThermsConditions = () => {

    return (
        <InfoThermsContainer>
            <InfoThermsContent>
                <InfoThermsTitle>TERMOS E CONDIÇÕES {'\n'}</InfoThermsTitle>
                <InfoThermsText>
                    Ao utilizar o site ou aplicativo da VitalCare, você concorda com os seguintes Termos e Condições de Serviço. Leia atentamente antes de prosseguir.
                    {'\n'}
                </InfoThermsText>

                <InfoThermsSubTitle>1. Aceitação dos Termos</InfoThermsSubTitle>
                <InfoThermsText>
                    Ao acessar e utilizar os serviços da VitalCare, você está de acordo com estes termos. Se não concordar com algum dos termos, deve cessar imediatamente o uso dos nossos serviços.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>2. Definições</InfoThermsSubTitle>
                <InfoThermsText>
                    Usuário: Qualquer pessoa que acessa o site ou aplicativo da VitalCare.{'\n'}
                    Serviços: Funcionalidades e conteúdos oferecidos pela VitalCare, incluindo, mas não se limitando, a informações e serviços de saúde.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>3. Alterações nos Termos</InfoThermsSubTitle>
                <InfoThermsText>
                    A VitalCare se reserva o direito de modificar os Termos e Condições a qualquer momento, publicando as atualizações em nosso site ou aplicativo. 
                    O uso contínuo após as modificações constitui a aceitação das novas condições.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>4. Uso dos Serviços</InfoThermsSubTitle>
                <InfoThermsText>
                    Você se compromete a utilizar os serviços da VitalCare de maneira responsável, seguindo as leis aplicáveis e respeitando os direitos de terceiros. É proibido: 
                    Utilizar o serviço para qualquer finalidade ilícita; Copiar, reproduzir ou distribuir os conteúdos sem autorização prévia.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>5. Registro de Usuário</InfoThermsSubTitle>
                <InfoThermsText>
                    Alguns serviços da VitalCare exigem registro de conta. Ao se registrar, você se compromete a fornecer informações precisas e atualizadas, bem como manter a confidencialidade de sua senha.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>6. Pagamentos e Assinaturas</InfoThermsSubTitle>
                <InfoThermsText>
                    Determinados serviços podem exigir pagamento. As condições de preços e métodos de pagamento serão informadas no momento da contratação. A não quitação dos valores implica na suspensão ou cancelamento dos serviços.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>7. Responsabilidade</InfoThermsSubTitle>
                <InfoThermsText>
                    A VitalCare se esforça para fornecer informações precisas e atualizadas, porém não garante a precisão, integridade ou adequação das informações fornecidas. O usuário assume todos os riscos associados ao uso dos serviços.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>8. Propriedade Intelectual</InfoThermsSubTitle>
                <InfoThermsText>
                    Todos os direitos sobre o conteúdo, design, software e marcas da VitalCare são reservados e não podem ser utilizados sem autorização prévia.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>9. Cancelamento e Suspensão de Serviços</InfoThermsSubTitle>
                <InfoThermsText>
                    A VitalCare se reserva o direito de suspender ou encerrar os serviços ao usuário que violar estes Termos, sem aviso prévio e sem direito a reembolso, quando aplicável.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>10. Legislação Aplicável</InfoThermsSubTitle>
                <InfoThermsText>
                    Estes Termos e Condições são regidos pelas leis brasileiras. Qualquer disputa será dirimida no foro da comarca de São Paulo.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>11. Contato</InfoThermsSubTitle>
                <InfoThermsText>
                    Caso tenha qualquer dúvida sobre estes Termos e Condições, entre em contato pelo e-mail: vitalcareapp@gmail.com
                    {'\n\n'}
                </InfoThermsText>
            </InfoThermsContent>
        </InfoThermsContainer>
    );
};

export default InfoThermsConditions;