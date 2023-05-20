import { useContext, createContext, useState, useMemo, useEffect } from 'react'

// Este estado deberia estar ligado al objeto de modales en utils

const initialTipsState = {
  homeAdminInitial: true,
  homeUserInitial: true,
  purchasesInitial: true,
  manageFoodInitial: true,
  reservesListInitial: true,
  ticketsListInitial: true
}

const initialState = {
  ...initialTipsState,
  changeTipsState: () => {}
}

const TipsContext = createContext(initialState)

export function TipsProvider(props) {
  const [tips, setTips] = useState(initialTipsState)

  useEffect(() => {
    const value = window.localStorage.getItem('tips')
    const object = { ...initialTipsState, ...JSON.parse(value) }
    const tips = object ?? initialTipsState
    setTips(tips)
  }, [])

  const changeTipsState = (state) => {
    const newState = { ...tips, ...state }
    window.localStorage.setItem('tips', JSON.stringify(newState))
    setTips(newState)
  }

  const memoize = {
    ...tips,
    changeTipsState
  }

  const value = useMemo(() => memoize, [tips])

  return <TipsContext.Provider value={value} {...props} />
}

export function useTips() {
  return useContext(TipsContext)
}
