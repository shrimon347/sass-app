

const Header = ({title, description, icon}) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className="p-2 w-fit rounded-md">
            <span>{icon}</span>
        </div>
        <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>


    </div>
  )
}

export default Header