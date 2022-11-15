package launch;

import lombok.extern.log4j.Log4j2;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

import java.io.File;
@Log4j2

public class Main {
    public static void main(String[] args) {
        Tomcat tomcat = new Tomcat();
        tomcat.setBaseDir("temp");
        String port = "8080";
        log.error("Error-logging is working!");
        log.info("Launching Application");

        tomcat.setPort(Integer.parseInt(port));
        tomcat.getConnector();
        tomcat.addWebapp("",new File("src/main/webapp").getAbsolutePath());

        try {
            tomcat.start();
        } catch (LifecycleException e) {
            throw new RuntimeException(e);
        }
    }
}
