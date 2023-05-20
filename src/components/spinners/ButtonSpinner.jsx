import PropagateLoader from 'react-spinners/PropagateLoader'

export default function ButtonSpinner() {
  return (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )
}
