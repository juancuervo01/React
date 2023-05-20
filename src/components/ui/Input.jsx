import React from 'react'

export default function Input(props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name}>{props.label}</label>
      <input autoComplete="off" className="border p-2" {...props} />
    </div>
  )
}
