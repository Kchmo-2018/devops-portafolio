build:
	docker build -t devops-portfolio .

run:
	docker build -t devops-portfolio .

stop:
	docker stop devops-portfolio && docker rm devops-portfolio

restart: stop run

logs:
	docker logs -f devops-portfolio