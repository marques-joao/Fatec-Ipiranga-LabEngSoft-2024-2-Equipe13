package com.joaomarques.vitalcare.domain.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    public static final String ACCOUNT_SID = System.getenv("TW_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TW_AUTH_TOKEN");

    public void enviarMensagem(String numeroDestinatario, String mensagem) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message.creator(
                        new PhoneNumber("whatsapp:+55" + numeroDestinatario),
                        new PhoneNumber("whatsapp:+14155238886"),
                        mensagem)
                .create();

        System.out.println("Message sent with SID: " + message.getSid());
    }
}