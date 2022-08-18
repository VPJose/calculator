import CalculatorScreen from './components/CalculatorScreen'
import Button from './components/Button'

function App() {

  return (
    <div
      className='w-full h-screen bg-stone-800 flex justify-center items-center'> <div className='w-96 m-auto p-6 bg-neutral-900 text-white rounded-xl'
        onKeyPress={(e) => handleKey(e)}>
        <CalculatorScreen />
        <div className='grid grid-cols-4 content-center mt-6 gap-1.5'>
          <Button type="action" value="AC" />
          <Button type="operation" value="%" />
          <Button type="action" value="<==" />
          <Button type="operation" value="/" />
          <Button type="number" value="7" />
          <Button type="number" value="8" />
          <Button type="number" value="9" />
          <Button type="operation" value="*" />
          <Button type="number" value="4" />
          <Button type="number" value="5" />
          <Button type="number" value="6" />
          <Button type="operation" value="-" />
          <Button type="number" value="1" />
          <Button type="number" value="2" />
          <Button type="number" value="3" />
          <Button type="operation" value="+" />
          <Button type="action" value="+/-" />
          <Button type="number" value="0" />
          <Button type="action" value="." />
          <Button type="action" value="=" />
        </div>
      </div>
    </div>
  )
}

export default App
