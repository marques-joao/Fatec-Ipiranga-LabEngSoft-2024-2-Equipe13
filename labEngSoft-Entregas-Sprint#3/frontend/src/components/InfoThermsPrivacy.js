import { InfoThermsContainer, InfoThermsContent, InfoThermsSubTitle, InfoThermsText, InfoThermsTitle } from "./styles";

const InfoThermsPrivacy = () => {

    return (
        <InfoThermsContainer>
            <InfoThermsContent>
                <InfoThermsTitle>POLÍTICA DE PRIVACIDADE {'\n'}</InfoThermsTitle>
                
                <InfoThermsSubTitle>1. Coleta de Dados</InfoThermsSubTitle>
                <InfoThermsText>
                    A VitalCare pode coletar as seguintes informações pessoais:
                {'\n'}- Dados fornecidos diretamente pelo usuário ao preencher formulários (nome, e-mail, telefone);
                {'\n'}- Dados coletados automaticamente através de cookies e tecnologias similares (endereço IP, dados de navegação);
                {'\n'}- Informações financeiras para efetuar pagamentos ou assinaturas.
                {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>2. Utilização dos Dados</InfoThermsSubTitle>
                <InfoThermsText>
                    As informações coletadas são utilizadas para:
                    {'\n'}- Prestar e melhorar os serviços da VitalCare;
                    {'\n'}- Personalizar a experiência do usuário;
                    {'\n'}- Processar transações e enviar comunicados importantes;
                    {'\n'}- Realizar estudos e análises internas com o objetivo de melhorar nossos serviços.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>3. Compartilhamento de Dados</InfoThermsSubTitle>
                <InfoThermsText>
                    VitalCare se compromete a não compartilhar suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
                    {'\n'}- Quando houver consentimento do usuário;
                    {'\n'}- Para cumprir obrigações legais;
                    {'\n'}- Para parceiros de confiança, com a finalidade de melhorar o serviço, desde que esses parceiros sigam normas de privacidade e segurança.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>4. Armazenamento e Segurança dos Dados</InfoThermsSubTitle>
                <InfoThermsText>
                    Os dados coletados pela VitalCare são armazenados em servidores seguros e protegidos por medidas técnicas e administrativas apropriadas para garantir sua integridade e confidencialidade. 
                    No entanto, a VitalCare não pode garantir que não haverá acessos não autorizados a esses dados.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>5. Direitos dos Usuários</InfoThermsSubTitle>
                <InfoThermsText>
                    Você tem o direito de:
                    {'\n'}- Acessar, corrigir ou excluir suas informações pessoais;
                    {'\n'}- Solicitar a portabilidade dos seus dados;
                    {'\n'}- Retirar o consentimento para o uso dos seus dados a qualquer momento, sendo avisado sobre as consequências disso.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>6. Alterações na Política de Privacidade</InfoThermsSubTitle>
                <InfoThermsText>
                    A VitalCare pode atualizar esta política periodicamente, e qualquer alteração será comunicada por meio do nosso site ou aplicativo. 
                    Recomendamos que você revise esta página regularmente para se manter informado.
                    {'\n\n'}
                </InfoThermsText>
                
                <InfoThermsSubTitle>7. Contato</InfoThermsSubTitle>
                <InfoThermsText>
                    Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco pelo e-mail: vitalcareapp@gmail.com
                </InfoThermsText>
            </InfoThermsContent>
        </InfoThermsContainer>
    );
};

export default InfoThermsPrivacy;