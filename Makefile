docker_compose_prod:
	docker-compose -f docker-compose.prod.yml build

# Shouldn't run. big image size ~ 1GB
docker_compose_dev:
	docker-compose -f docker-compose.dev.yml build

run_image_prod:
	docker run -p 80:80 --name jobstreet-prod jobstreet-prod

run_image_dev:
	docker run -p 3000:3000 --name jobstreet-dev jobstreet-dev

start_prod:
	docker start jobstreet-prod

start_dev:
	docker start jobstreet-dev

.PHONY: docker_compose_prod docker_compose_dev run_image_prod run_image_dev start_prod start_dev