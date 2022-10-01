// Import WASM Module from preamble file
import Module from './webpack-emcc.mjs';

console.log("Hello emscripten from Javascript")

/**
 * Wasm module interface.
 * Only functions exported on emcc compilation are added to the module.
 * See -sEXPORTED_RUNTIME_METHODS flag on CMAKE_CXX_FLAGS variables.
 */
interface WasmModule {
    addFunction: (func: Function, signature: string) => string
    cwrap: <T>(ident: string, returnType: string, argumentTypes: string[]) => T
    getValue: (ptr: number, type: string) => number
}
let wasmModule: WasmModule

/**
 * Create Wasm module (returns a Promise), then start the app
 */
 Module().then((module: WasmModule) => {
    // Wasm module object
    wasmModule = module
    console.log("Wasm module:", module)

    // Get HTML elements
    getHTMLElements()

    // Wrap exported functions from C++
    registerFunctionPointer_updateTimer = module.cwrap<(id: string) => void>('registerFunctionPointer_updateTimer', 'void', ['string'])
    convertStringToAscii = module.cwrap<(text: string) => number>('convertStringToAscii', 'number', ['string'])

    // Export function to wasm module allowing using it from C++ code.
    const importedFunctionId = module.addFunction(updateTimer, 'vi')
    registerFunctionPointer_updateTimer(importedFunctionId.toString())
}).catch(error => {
    console.log("Error creating Wasm module:", error)
})

/**
 * HTML elements
 */
 let htmlCurrentTimerValue: HTMLElement
 let htmlInputBox: HTMLInputElement
 let htmlInputButton: HTMLElement
 let htmlWasmResult: HTMLElement

/**
 * Wrapped functions imported from C++
 */
 let registerFunctionPointer_updateTimer: (id: string) => void
 let convertStringToAscii: (text: string) => number

 /**
 * Get HTML elements
 */
  const getHTMLElements = (): void => {
    htmlCurrentTimerValue = document.getElementById('current-time-value')
    htmlInputBox = document.getElementById('input-box') as HTMLInputElement
    htmlInputButton = document.getElementById('input-button')
    htmlWasmResult = document.getElementById('wasm-result')

    // Initialize elements
    htmlInputBox.value = 'Test me!'
    htmlInputButton.onclick = inputButtonClick
}

/**
 * Input button click
 */
 const inputButtonClick = () => {
    const str = htmlInputBox.value
    const ptr = convertStringToAscii(str)
    htmlWasmResult.textContent = ""
    for ( let i = 0; i < str.length * 4; i += 4) {
        htmlWasmResult.textContent += wasmModule.getValue(ptr + i, 'i32') + ' '
    }
}

/**
 * Update timer value from milliseconds in HTML
 */
 const updateTimer = (milliseconds: number): void => {
    let mms = Math.floor((milliseconds % 1000) / 100)
    let sec = Math.floor((milliseconds / 1000) % 60)
    let min = Math.floor((milliseconds / (1000 * 60)) % 60)
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)

    htmlCurrentTimerValue.innerText = `${hours}:${min}:${sec}.${mms}`
}
