# Variables
OUT_DIR = out

# Clean previous builds
clean:
	rm -rf .next $(OUT_DIR)

# Run the build process with production settings
build: clean
	NODE_ENV=production npm run build

# Serve the 'out' folder locally
serve: build
	npx serve $(OUT_DIR)

# All-in-one command to clean, build, and serve
run: serve
