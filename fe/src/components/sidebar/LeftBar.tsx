import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const LeftBar = () => {
  return (
    <div className="flex flex-col items-center w-12 md:w-15 py-4 bg-blue-500 h-screen sticky top-0">
      <Avatar className="w-10 h-10 md:w-12 md:h-12">
        <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
        <AvatarFallback>You</AvatarFallback>
      </Avatar>
    </div>
  )
}

