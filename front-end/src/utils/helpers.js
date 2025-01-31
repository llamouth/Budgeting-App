const calculateCents = (array, amount) => {
    let [dollars,cents] = array

    if(amount > cents) {
        dollars -= 1
        cents += 100
        if(cents >= 100) {
            dollars += 1
            cents -= 100
        }
        return cents - amount
    }else {
        return cents
    }
}

const generateTotalAmount = (arr) => {
    const totalArr = arr.reduce((array, tran) => {
        const numArr = tran.amount.split(".")
        const cents = numArr[1]
        let dollar = numArr[0]
        if(dollar.includes("-")){
            array[0] += +dollar
            array[1] = calculateCents(array, cents)
        }else {
            array[0] += +dollar
            array[1] += +cents
        }
        return array
    },[0,0])

    if(totalArr[1] === 0) {
        totalArr[1] = "00"
    }

    if(Math.sign(totalArr[0]) === -1) {
        return `-$${String(totalArr[0]).slice(1)}.${totalArr[1]}`
    }

    return `$${totalArr.join(".")}`
}

const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

const formatAmount = (str) => {
    if(str.includes("-")){
        return `-$${str.slice(1)}`
    }else {
        return `$${str}`
    }
}

export {generateTotalAmount, formatString, formatAmount}