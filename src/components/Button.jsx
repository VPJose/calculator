import { useCalculator } from '../context/CalculatorState'

const Button = ({ type, value }) => {

  const { addNumber, addOperation, executeAction } = useCalculator()

  const handleClick = () => {

    if (type == 'number')
      addNumber(value)

    if (type == 'operation')
      addOperation(value)

    if (type == 'action')
      executeAction(value)
  }


  return (
    <button
      className='border border-slate-200 w-20 h-20 text-lg rounded-md hover:bg-gray-600'
      onClick={handleClick}>{value}</button>
  )
}

export default Button
