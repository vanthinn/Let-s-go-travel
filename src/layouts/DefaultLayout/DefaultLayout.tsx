import { FC } from 'react'
import Header from '../components/Header'

interface Props {
 children: React.ReactNode
}

const DefaultLayout: FC<Props> = ({ children }): JSX.Element => {
 return (
  <div className=" min-h-screen wrapper overflow-x-hidden flex flex-col  ">
   <Header />
   <div className="grid flex-1 z-10">
    <main className="mt-20 flex flex-col relative">{children}</main>
   </div>
  </div>
 )
}

export default DefaultLayout
