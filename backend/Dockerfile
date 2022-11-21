#FROM gradle:7.5
FROM zaq1290/spring_konlpy

WORKDIR /var/jenkins_home/workspace/easssue/backend

COPY ./ ./

RUN gradle clean build --no-daemon

CMD ["java", "-jar", "./build/libs/easssue-0.0.1-SNAPSHOT.jar"]