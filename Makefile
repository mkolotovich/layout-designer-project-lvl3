make deploy:
	surge build
make build:
	gulp build
make start:
	gulp build
	gulp start
make lint:
	npx stylelint ./app/scss/**/*.scss