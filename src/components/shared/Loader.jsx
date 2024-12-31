import loader from "../../assets/image/loader.png"
const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 relative animate-spin">
            <img src={loader} alt="loader"  />
        </div>
        <p className="text-sm text-muted-foreground">Riobot is Thinking...</p>
    </div>
  )
}

export default Loader