import { SidebarProvider } from '@/components/ui/sidebar'
import { LoginForm } from '@/components'
import { AppSidebar } from '@/components'

const HomePage = () => {
  return (
    <SidebarProvider className='justify-center items-center'>
        <AppSidebar></AppSidebar>
        <LoginForm className='w-xl min-w-sm'></LoginForm>
    </SidebarProvider>
  )
}

export default HomePage
