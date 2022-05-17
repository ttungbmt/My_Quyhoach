FROM kartoza/geoserver:latest

LABEL maintainer="Truong Thanh Tung<ttungbmt@gmail.com>"

# Start as root
USER root

RUN apt-get update -yqq

RUN apt-get install -y telnet iputils-ping && \
        apt-get install -y fonts-noto fonts-dejavu unifont fonts-hanazono
