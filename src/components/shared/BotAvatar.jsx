import avatar from "../../assets/image/loader.png"

const BotAvatar = () => {
  return (
    <div className="h-8 w-8">
        <img className="p-1" src={avatar} alt="avatar" />
    </div>
  )
}

export default BotAvatar