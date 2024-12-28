package com.stocktrading.stocktrade.Service;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    private JavaMailSender javaMailSender;
    public void sendverificationOtpEmail(String email,String otp) throws MessagingException{
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper=new MimeMessageHelper(mimeMessage,"utf-8");

        String subject="Verify OTP";
        String text="Your verification code is " +otp;
        messageHelper.setSubject(subject);
        messageHelper.setText(text);
        messageHelper.setTo(email);
        try {
            javaMailSender.send(mimeMessage);
        } catch (MailException exception) {
            throw new MessagingException(exception.getMessage());
        }
    }
}


