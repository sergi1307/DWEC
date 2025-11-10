#!/bin/bash
set -e

echo "🟢 Iniciando contenedor MySQL de biblioteca..."

#Verifica que las variables están definidas
: "${MYSQL_ROOT_PASSWORD:?Debes definir MYSQL_ROOT_PASSWORD en .env o docker-compose.yml}"
: "${MYSQL_DATABASE:?Debes definir MYSQL_DATABASE}"
: "${MYSQL_USER:?Debes definir MYSQL_USER}"
: "${MYSQL_PASSWORD:?Debes definir MYSQL_PASSWORD}"

#Llama al entrypoint original de MySQL
exec docker-entrypoint.sh "$@"