rm -rf dist
rm -rf coverage
cp src/*.d.ts dist/src
esbuild src/custom-element.js --outfile=dist/src/shadow-dom-element.js --minify --sourcemap --target=chrome100
mkdir coverage
web-test-runner --coverage | tee -a coverage/coverage.log
coverageValue=`grep "Code coverage:" coverage/coverage.log | grep -oE -m 1 '\s*([0-9.]+\ %)' | grep -oE -m 1 '\s*([0-9]+)'|head -1`
echo "coverage.svg ${coverageValue}%"
sed "s/000%/${coverageValue}%/" test/coverage.svg >coverage/coverage.svg
