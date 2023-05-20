import React from 'react'

export default function Select(props) {
  return (
    <div className={`flex flex-col gap-1 ${props.extendClass}`}>
      <label htmlFor={props.name}>{props.label}</label>
      <select autoComplete="off" className="border p-2" {...props} />
    </div>
  )
}
