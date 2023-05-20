import { Link as RRDLink } from 'react-router-dom'

export default function Link(props) {
  return (
    <RRDLink to={props.to} className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white px-2 py-1" {...props} />
  )
}
