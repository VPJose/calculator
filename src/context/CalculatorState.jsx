import {
  createContext,
  useContext,
  useState
} from "react"

const calculatorContext = createContext()

export const useCalculator = () => {
  const context = useContext(calculatorContext)

  if (!context) throw new Error("No esta Puesto el Task Provider o esta vacio")

  return context
}

export const CalculatorState = ({ children }) => {

  const [memory, setMemory] = useState(0)
  const [operation, setOperation] = useState(null)
  const [currentValue, setCurrentValue] = useState(0)
  const [isDecimal, setIsDecimal] = useState(false)

  const addNumber = (value) => {
    let newValue = currentValue

    console.log(currentValue)

    if ((value == '.') && (!isDecimal)) {
      setIsDecimal(true)
      const point = isDecimal ? '.' : ''
      newValue = currentValue.toString() + point + value.toString()
    }

    if ((value !== '.') && (isDecimal)) {
      setIsDecimal(false)
      newValue = currentValue.toString() + '.' + value.toString()
    }

    if ((value !== '.') && (!isDecimal))
      newValue = currentValue.toString() + value.toString()

    setCurrentValue(parseFloat(newValue));
  }

  const addOperation = (op) => {

    if (operation !== null) {
      getResult()
      setOperation(null)
    }

    if (operation == null) {
      setOperation(op)
      if (memory == 0)
        setMemory(currentValue)
    }

    setCurrentValue(0)
  }

  const getResult = () => {
    let result = 0
    if (currentValue && operation) {
      switch (operation) {
        case "+":
          result = parseFloat(currentValue) + parseFloat(memory)
          break
        case "-":
          result = parseFloat(memory) - parseFloat(currentValue)
          break
        case "*":
          result = parseFloat(currentValue) * parseFloat(memory)
          break
        case "/":
          result = parseFloat(memory) / parseFloat(currentValue)
          break
        case "%":
          result = (parseFloat(memory) / 100) * parseFloat(currentValue)
          break
        default:
      }
      setCurrentValue(0)
      setOperation(null);
      setMemory(result);
      setIsDecimal(false)
    }
  }

  const cleanUp = () => {
    setCurrentValue(0);
    setOperation(null);
    setMemory(0)
    setIsDecimal(false)
  }

  const setDelete = () => {

    if (currentValue.toString().length > 1)
      setCurrentValue(parseFloat(currentValue.toString().slice(0, currentValue.toString().length - 1)))

    if (currentValue.toString().length == 1)
      setCurrentValue(0)

    if ((operation !== null) && (currentValue == 0))
      setOperation(null)

    if ((currentValue == 0) && (operation == null) && (memory.toString().length > 0))
      setMemory(parseFloat(memory.toString().slice(0, memory.toString().length - 1)))

    if ((currentValue == 0) && (operation == null) && (memory.toString().length == 1))
      setMemory(0)
  }

  const changeSig = () => {
    setCurrentValue(currentValue * -1)
  }

  const converToFloat = () => {
    if (currentValue.toString().indexOf(".") > 0) {
      //
    } else {
      addNumber('.')
    }
  }

  const executeAction = (action) => {
    switch (action) {
      case "=":
        getResult()
        break
      case "AC":
        cleanUp()
        break
      case "<==":
        setDelete()
        break
      case "+/-":
        changeSig()
        break
      case ".":
        converToFloat()
        break
      default:
    }
  }

  return (
    <calculatorContext.Provider
      value={{
        memory,
        operation,
        currentValue,
        isDecimal,
        addNumber,
        addOperation,
        getResult,
        executeAction
      }}>
      {children}
    </calculatorContext.Provider>
  )
}
