compose:
	docker-compose -f docker-compose.yaml up
compose-dev:
	docker-compose -f docker-compose-dev.yml up
PHONY:
	compose compose-dev