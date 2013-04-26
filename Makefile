deploy:
	@echo "Deploy"
	ssh -t deploy@joriktangelder.nl 'cd joriktangelder.nl && make update'

update:
	@echo "Update"
	git pull
	jekyll

dev:
	@echo "Dev env"
	jekyll --server 8000