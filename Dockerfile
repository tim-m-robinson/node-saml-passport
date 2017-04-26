FROM openshift/nodejs-010-centos7
ADD . /src
EXPOSE 8000
CMD node /src/app.js >> app.log
