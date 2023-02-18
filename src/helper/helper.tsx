export const capiltalLetter = (input: string) => {
    return input.charAt(0).toLocaleUpperCase() + input.slice(1).toLocaleLowerCase()
}