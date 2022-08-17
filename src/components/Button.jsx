import { useCalculator } from '../context/CalculatorState'

const Button = ({ type, value }) => {

  const { addNumber, addOperation, executeAction } = useCalculator()

  const handleClick = () => {
    switch (type) {
      case 'number':
        addNumber(parseInt(value))
        break
      case 'operation':
        addOperation(value)
        break
      case 'action':
        executeAction(value)
        break
      default:
        break
    }
  }

  return (
    <button
      className='border border-slate-200 w-20 h-20 text-lg rounded-md hover:bg-gray-600'
      onClick={handleClick}>{value}</button>
  )
}

export default Button
