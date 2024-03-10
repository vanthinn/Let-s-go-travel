import { FC } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Siderbar'

interface Props {
 children: React.ReactNode
}

const ProfileLayout: FC<Props> = ({ children }): JSX.Element => {
 return (
  <div className=" min-h-screen wrapper overflow-x-hidden flex flex-col  ">
   <Header />
   <div className="px-24 grid grid-cols-12 flex-1 z-10 gap-12 mt-32">
    <nav className="col-span-3 ">
     <Sidebar />
    </nav>
    <main className="col-span-9   flex flex-col relative">{children}</main>
   </div>
  </div>
 )
}

export default ProfileLayout
