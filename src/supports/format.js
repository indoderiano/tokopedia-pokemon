export function title(str){
    let output = str.split('')
    output[0] = output[0].toUpperCase()

    return output.join('')
}