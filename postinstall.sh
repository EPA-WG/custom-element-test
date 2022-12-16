# as tested sources reside in foreign module, they would be copied into src
# to be treated as internal by test coverage
mkdir src
cd src

rm custom-element.d.ts >/dev/null
rm custom-element.js >/dev/null

cp ../node_modules/@epa-wg/custom-element/custom-element.d.ts custom-element.d.ts
cp ../node_modules/@epa-wg/custom-element/custom-element.js custom-element.js
ls ../node_modules/@epa-wg/custom-element/custom-element.js
ls custom-element.js
