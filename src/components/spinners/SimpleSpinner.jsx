import { ClipLoader } from 'react-spinners'

export default function SimpleSpinner() {
  return (
    <ClipLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )
}
