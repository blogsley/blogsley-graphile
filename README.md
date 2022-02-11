# Blogsley Graphile :moon: :elephant:

## Description

Blogsley Server using PostGraphile & TypeORM

:warning:  This is just an experiment

## Loading fixtures

```bash
yarn loadfixtures
```

## Development Setup

### Linux
> .bashrc
```bash
export DOCKER_GATEWAY_HOST="`hostname -I` |awk '{print $1}'  `"
```

## Docker Compose

### Development

```bash
docker-compose up
```

### Production

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Traefik/Let's Encrypt
```bash
sudo chmod 600 acme.json
```

## Backup
[https://github.com/prodrigestivill/docker-postgres-backup-local](https://github.com/prodrigestivill/docker-postgres-backup-local)

On the host:

```
sudo mkdir -p /var/opt/blogsley/backups && sudo chown -R 999:999 /var/opt/blogsley/backups
```