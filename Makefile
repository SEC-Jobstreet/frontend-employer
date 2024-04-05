build_prod:
	-docker rm jobstreet-prod
	-docker rmi jobstreet-prod
	docker-compose build

run_prod:
	docker run -p 3000:3000 --name jobstreet-prod jobstreet-prod

start_prod:
	docker start jobstreet-prod

build_run_prod:
	make build_prod
	make run_prod

.PHONY: build_prod build_dev run_prod run_dev start_prod start_dev build_run_prod