import { useCalculator } from '../context/CalculatorState'

const CalculatorScreen = () => {

  const { memory, operation, currentValue, isDecimal } = useCalculator()

  return (
    <div className='w-11/12 text-start m-3 p-px text-lg bg-neutral-600 rounded-xl'>
      <div className='pl-2'>
        {memory} {operation} {operation && `${!currentValue ? '' : currentValue}${!isDecimal ? '' : currentValue == 0 ? '0.' : '.'}`}
      </div>
      <div className='pl-2'>{currentValue}{isDecimal ? '.' : ''}</div>
    </div>
  )
}

export default CalculatorScreen
