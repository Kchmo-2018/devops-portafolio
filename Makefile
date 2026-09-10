build:
	docker build -t devops-portfolio ./src

run:
	docker run -d -p 8080:80 --name devops-portfolio devops-portfolio

stop:
	docker stop devops-portfolio && docker rm devops-portfolio

restart: stop run

logs:
	docker logs -f devops-portfolio