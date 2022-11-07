package com.limemul.easssue;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.jasypt.util.text.BasicTextEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureWebMvc
@Rollback
public class JasyptTest {

    static class JasyptEncrypt {
        String password;

        public JasyptEncrypt(String password) {
            this.password = password;
        }
    }
    @Test
    public void 암호화테스트(){
        System.out.println("test start");
        JasyptEncrypt jasyptEncrypt = new JasyptEncrypt("1234");
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword("password");
        String encryptPwd = textEncryptor.encrypt(jasyptEncrypt.password);
        assertNotEquals(jasyptEncrypt.password, encryptPwd);
    }

    @Test
    public void verifyPasswordOneWayEncryption() {
        JasyptEncrypt jasyptEncrypt = new JasyptEncrypt("1234"); // 비번
        BasicPasswordEncryptor basicEncrypt = new BasicPasswordEncryptor(); // 암호화
//        String encryptPwd = basicEncrypt.encryptPassword(jasyptEncrypt.password);
        String encryptPwd = basicEncrypt.encryptPassword("1234");
        boolean checkPwd = basicEncrypt.checkPassword(jasyptEncrypt.password, encryptPwd);
        System.out.println(checkPwd);
        assertTrue(checkPwd);
    }
}
