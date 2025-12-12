import ChatWindo from "./ChatWindo"
import { LeftBar } from "./LeftBar"

const AppSideBar = () => {
  return (
    <>
      <div className="flex">
        <LeftBar></LeftBar>
        <ChatWindo></ChatWindo>
      </div>
    </>
  )
}

export { AppSideBar }
