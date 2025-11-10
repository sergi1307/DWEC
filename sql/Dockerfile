FROM mysql:8.0

VOLUME [ "/var/lib/mysql" ]

EXPOSE 3306

COPY docker-entrypoint.sh /usr/local/bin/custom-entrypoint.sh
RUN chmod +x /usr/local/bin/custom-entrypoint.sh

ENTRYPOINT [ "/usr/local/bin/custom-entrypoint.sh" ]

CMD [ "mysqld" ]