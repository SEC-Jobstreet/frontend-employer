build_prod:
	-docker rm employer-prod
	-docker rmi employer-prod
	docker-compose -f docker-compose.prod.yml build

# Shouldn't run. big image size ~ 1GB
build_dev:
	-docker rm employer-dev
	-docker rmi employer-dev
	docker-compose -f docker-compose.dev.yml build

run_prod:
	docker run -p 81:81 --name employer-prod employer-prod

run_dev:
	docker run -p 3001:3001 --name employer-dev employer-dev

start_prod:
	docker start employer-prod

start_dev:
	docker start employer-dev

build_run_prod:
	make build_prod
	make run_prod

.PHONY: build_prod build_dev run_prod run_dev start_prod start_dev build_run_prod