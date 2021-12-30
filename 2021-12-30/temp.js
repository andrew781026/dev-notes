/*

1. Simply to writing down differences between one-way data flow and two-way data binding?
2. What is different between computed, watch and method()?
3. List some of ES6 features and explaining a bit about it.

- arrow function - react / bind(this) issue
- spread - {...obj} [...arr] / [a,b]=arr / {x,y} = obj / ({a,b}) => a+b
- default value - ({a=8,b=9}) => a+b
- ?. - empty checker / a?.b?.c?.d

4. Briefing a bit about Vuex and how does it work, also when most of time were you using it?



5. Explain how you can use JavaScript functions such as forEach, Map, or Reduce.

const b = [1,2,3,4,5,6]
b.forEach(n => console(n))
const t = b.map(n => n+3)
t.forEach(n => console(n)) // 顯示 : 456789
const sum = b.reduce( (pre,curr) => pre + curr , 0 )
console(sum) // 顯示 : 21

6. Can you explain about Pure function, what is the properties? And can you make an example.
7. What is different between framework base website and normal website (none framework)
8.下方 console.log 的字母順序為 ?

setTimeout(b, 100)
setTimeout(d(), 1000)
a(c)
var delay = 0
for(let i=100000; i--;) delay++
e()
function a(cb){
    console.log('a')
    setTimeout(cb, 0)
}
function b(){ console.log('b') }
function c(){ console.log('c') }
function d(){ console.log('d') }
function e(){ console.log('e') }

// 顯示 : setTimeout(d(), 1000) 這行會報錯 , 因為 setTimeout 第一個參數必須傳入函式

9. Implementing let summary = sum(1)(2)(3), console.log(summary).
// Expected summary is 6

10.What is the result of the console logout?
setName = 'global'

function test() {
    console.log(setName)
    var setName = 'local'
    console.log(setName)
}

// undefined local

 */

// 9. Implementing let summary = sum(1)(2)(3), console.log(summary).
// Expected summary is 6
const sum = a => (b => (c => a + b + c))

const summary = sum(1)(2)(3)

console.log(summary)

// compose 的參考資料 : https://jigsawye.gitbooks.io/mostly-adequate-guide/content/ch5.html
const compose = (f, g) => (x => f(g(x)))
const toUpperCase = x => x.toUpperCase();
const exclaim = x => x + '!';

const shout = compose(exclaim, toUpperCase);

console.log(shout("send in the clowns"))
//=> "SEND IN THE CLOWNS!"
