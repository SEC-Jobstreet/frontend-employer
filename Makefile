build_prod:
	-docker rm jobstreet-prod
	-docker rmi jobstreet-prod
	docker-compose -f docker-compose.prod.yml build

# Shouldn't run. big image size ~ 1GB
build_dev:
	-docker rm jobstreet-dev
	-docker rmi jobstreet-dev
	docker-compose -f docker-compose.dev.yml build

run_prod:
	docker run -p 3000:3000 --name jobstreet-prod jobstreet-prod

run_dev:
	docker run -p 3000:3000 --name jobstreet-dev jobstreet-dev

start_prod:
	docker start jobstreet-prod

start_dev:
	docker start jobstreet-dev

build_run_prod:
	make build_prod
	make run_prod

.PHONY: build_prod build_dev run_prod run_dev start_prod start_dev build_run_prod