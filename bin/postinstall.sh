# as tested sources reside in foreign module, they would be copied into src
# to be treated as internal by test coverage

mkdir src
cd src

rm *.d.ts >/dev/null
rm *.js >/dev/null
pwd
cp ../node_modules/@epa-wg/custom-element/*.d.ts .
cp ../node_modules/@epa-wg/custom-element/*.js .
cp ../node_modules/@epa-wg/custom-element/index.html index.html
ls ../node_modules/@epa-wg/custom-element/*.js
ls *.js
