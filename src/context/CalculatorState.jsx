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
  const [isReset, setIsReset] = useState(true)
  const [isDecimal, setIsDecimal] = useState(false)

  const addNumber = (value) => {
    if (isReset) {
      if (value == '.') {
        setIsDecimal(true)
      } else {
        const point = isDecimal ? '.' : ''
        const newValue = currentValue.toString() + point + value.toString()
        setCurrentValue(parseFloat(newValue));
        setIsReset(false);
        setIsDecimal(false)
      }
    } else {
      if (value == '.') {
        setIsDecimal(true)
      } else {
        const point = isDecimal ? '.' : ''
        const newValue = currentValue.toString() + point + value.toString()
        setCurrentValue(parseFloat(newValue))
        setIsReset(false)
        setIsDecimal(false)
      }
    }
  }

  const addOperation = (op) => {
    if (currentValue) {
      if (operation) {
        getResult()
        setOperation(op)
      } else {
        setOperation(op)
        setMemory(currentValue)
        setCurrentValue(0)
        setIsReset(true)
      }
    }
  }

  const getResult = () => {
    let result = 0
    if (currentValue && operation && memory) {
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
      setCurrentValue(result)
      setOperation(null);
      setMemory(result);
      setIsReset(true);
      setIsDecimal(false)
    }
  }

  const cleanUp = () => {
    setCurrentValue(0);
    setOperation(null);
    setMemory(0)
    setIsReset(true)
    setIsDecimal(false)
  }

  const deleteNumber = () => {
    const index = currentValue.toString().indexOf('.')
    if (index > 0) {
      const newValue = currentValue.toString().slice(0, currentValue.toString().length - 1)
      setCurrentValue(parseFloat(newValue))
    } else {
      setCurrentValue(parseInt(currentValue / 10))
    }
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
        deleteNumber()
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
