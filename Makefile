build-S3ToDynamoFunction: install-node-modules
	npm install
	rm -rf dist
	npm run compile
	cp -r ./dist "$(ARTIFACTS_DIR)/"

install-node-modules:
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/"
	rm "$(ARTIFACTS_DIR)/package.json"
	rm "$(ARTIFACTS_DIR)/package-lock.json"
