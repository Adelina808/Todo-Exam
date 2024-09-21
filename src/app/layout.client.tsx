'use client'
import ReduxProvider from "@/providers/ReduxProvider"
import { FC, ReactNode } from "react"

interface LayoutClientType{
    children:ReactNode
}
const LayoutClient:FC<LayoutClientType> = ({children}) => {
  return (
    <ReduxProvider>{children}</ReduxProvider>
  )
}

export default LayoutClient