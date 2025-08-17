import { InfinitySpin } from "react-loader-spinner";


export default function LoudingScreen() {
  return (
    <div className="flex justify-center items-center h-screen  bg-slate-100 dark:bg-gray-950">
      <InfinitySpin
  visible={true}
  width="200"
  color="#0000ff"
  ariaLabel="infinity-spin-loading"
  />
    </div>
  )
}
