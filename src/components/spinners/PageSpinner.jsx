import { HashLoader } from 'react-spinners'

export default function PageSpinner({ text }) {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <HashLoader color="#00AAFF" />
      <p>{text}</p>
    </div>
  )
}
