'use client'
import React from 'react'
import Image from '@/node_modules/next/image'
import { usePathname, useRouter } from "next/navigation";
import Link from '@/node_modules/next/link'

import styled from 'styled-components'
import { useGlobalState } from '../context/globalProvider'
import menu from '../utils/menu'


export default function Sidebar() {
  const {theme} = useGlobalState()

  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (link:string) => {
    router.push(link)
  }

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src="/avatar.jpg" alt='profile'/>
        </div>
        <h1>
          <span>Mary</span>
          <span>Great</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map(item => {
          const link = item.link

          return <li
          key={item.title}
          className={`nav-item ${pathname === link ? 'active' : ''}`} 
            onClick={() => handleClick(link)}
          >
            {item.icon}
            <Link href={link}>{item.title}</Link>
          </li>
        })}
      </ul>
    </SidebarStyled>
  )
};

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
`