import React, {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Header = ({text}) => <h1>{text}</h1>

const Statistics = ({goodCount, neutralCount, badCount}) => {

  let all = goodCount + neutralCount + badCount
  let average = all > 0 ? (goodCount - badCount) / all : 0
  let positve = all > 0 ? (goodCount / all) * 100 : 0

  if(all > 0){
    return (
      <table>
        <tbody>
          <StatisticLine name='good' value={goodCount}/>
          <StatisticLine name='neutral' value={neutralCount}/>
          <StatisticLine name='bad' value={badCount}/>
          <StatisticLine name='all' value={all}/>
          <StatisticLine name='average' value={average}/>
          <StatisticLine name='positve' value={positve + ' %'}/>
        </tbody>
      </table>
    )
  }
  
  return (
    <div>No feedback given</div>
  )
  
}

const StatisticLine = ({name, value}) => {
  return (
      <tr>
        <td>{name}</td> 
        <td>{value}</td>
      </tr>
  )
}

const App = props => {
  const [goodCount, setGood] = useState(0)
  const [neutralCount, setNeutral] = useState(0)
  const [badCount, setBad] = useState(0)

  const handleGoodClick = () => setGood(goodCount + 1)
  const handleNeutralClick = () => setNeutral(neutralCount + 1)
  const handleBadClick = () => setBad(badCount + 1)

  return (
    <div>
      <div>
        <Header text='give feedback'/>
        <Button handleClick={handleGoodClick} text='good'/>
        <Button handleClick={handleNeutralClick} text='neutral'/>
        <Button handleClick={handleBadClick} text='bad'/>
      </div>
      <div>
        <Header text='statistics'/>
        <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}/>
      </div>
    </div>
  )
}

export default App;
