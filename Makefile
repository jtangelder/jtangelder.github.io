update:
	@echo "Update"
	git pull
	jekyll

dev:
	@echo "Dev env"
	jekyll --server 8000