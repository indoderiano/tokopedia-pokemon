export function title(str){
    if(str === null || ''){
        return ''
    }
    let output = str.split('')
    output[0] = output[0].toUpperCase()

    return output.join('')
}