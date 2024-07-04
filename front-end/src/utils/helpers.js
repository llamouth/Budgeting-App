const generateTotalAmount = (arr) => {
    const totalArr = arr.reduce((array, tran, i) => {
        const numArr = tran.amount.split(".")
        const dollar = +numArr[0].slice(1)
        const cents = +numArr[1]
        array[0] += dollar
        array[1] += cents
        return array
    },[0,0])

    if(totalArr[1] === 0) {
        totalArr[1] = "00"
    }
    return `$${totalArr.join(".")}`
}

const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

const formatAmount = (str) => {
    if(str.includes("$")){
        return str
    }else {
        return `$${str}`
    }
}

export {generateTotalAmount, formatString, formatAmount}