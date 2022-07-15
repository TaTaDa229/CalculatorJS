const display1 = document.querySelector('.display-1')
const display2 = document.querySelector('.display-2')
const tempResult = document.querySelector('.temp-result')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const clearAll = document.querySelector('.all-clear')
const clearlast = document.querySelector('.last-entity-clear')

let dis1Num = ''
let dis2Num = ''
let result = null
let lastOperation = ''
let haveDot = false

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true
        } else if (e.target.innerText === '.' && haveDot){
            return
        }
        dis2Num += e.target.innerText
        display2.innerText = dis2Num
    })
})

operations.forEach(operation => {
    operation.addEventListener('click', (e) =>{
        const operationName = e.target.innerText
        haveDot = false
        if(!dis2Num) {
            return
        }
        if(dis1Num && dis2Num && lastOperation){
            mathOperation()
        } else {
            result = parseFloat(dis2Num)
        }
        clearVar(operationName)
        lastOperation = operationName
    })
})

function clearVar(name = ''){
    dis1Num += dis2Num + ' ' + name + ' '
    display1.innerText = dis1Num
    display2.innerText = ''
    dis2Num = ''
    tempResult.innerText = result
}

function mathOperation(){
    if(lastOperation === 'x'){
        result = parseFloat(result) * parseFloat(dis2Num)
    } else if (lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num)
    } else if (lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num)
    } else if (lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num)
    } else if (lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}

equal.addEventListener('click', (e) => {
    haveDot = false
    mathOperation()
    clearVar()
    display2.innerText = result
    tempResult.innerText = ''
    dis2Num = result
    dis1Num = ''
    if(!dis1Num || !dis2Num) {
        return
    }
})

clearAll.addEventListener('click', (e) => {
    display1.innerText = '0'
    display2.innerText = '0'
    dis1Num = ''
    dis2Num = ''
    result = ''
    tempResult.innerText = '0'
})

clearlast.addEventListener('click', (e) => {
    display2.innerText = ''
    dis2Num = ''
})

window.addEventListener('keydown', (e) => {
    if(
        e.key == '0' ||
        e.key == '1' ||
        e.key == '2' ||
        e.key == '3' ||
        e.key == '4' ||
        e.key == '5' ||
        e.key == '6' ||
        e.key == '7' ||
        e.key == '8' ||
        e.key == '9' ||
        e.key == '.'
    ){
        clickButton(e.key)
    } else if (
        e.key === '*' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '/' ||
        e.key === '%'
    ){
        clickOperation(e.key)
    } else if (e.key === 'Enter' || e.key === '='){
        equal.click()
    }
})

function clickButton(key){
    numbers.forEach( button => {
        if(button.innerText === key){
            button.click()
        }
    })
}

function clickOperation(key){
    operations.forEach(button => {
        if(button.innerText === key){
            button.click()
        }
    })
}