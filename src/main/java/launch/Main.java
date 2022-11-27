package launch;

import lombok.extern.log4j.Log4j2;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;
import io.sentry.Sentry;

import java.io.File;
@Log4j2

public class Main {
    public static void main(String[] args) {

        Sentry.init(options -> {
            options.setDsn("https://71379769231243c4a6ecb1b4484fd645@o4504162458664960.ingest.sentry.io/4504162460303360");
            // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
            // We recommend adjusting this value in production.
            options.setTracesSampleRate(1.0);
            // When first trying Sentry it's good to see what the SDK is doing:
            options.setDebug(true);
        });

        Tomcat tomcat = new Tomcat();
        tomcat.setBaseDir("temp");
        String port = "8080";
        log.error("Error-logging is working!");
        log.info("Launching Application");
        try {
            throw new Exception("This is a test.");
        } catch (Exception e) {
            Sentry.captureException(e);
        }

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
