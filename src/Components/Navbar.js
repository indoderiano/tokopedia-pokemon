import { css, cx } from '@emotion/css'
import styled from '@emotion/styled'
import React, { useContext, useState } from 'react'
import ThemeContext from '../context'
import { Link } from 'react-router-dom'
import logo from '../images/poke-logo.png'

const List = styled.div(props => ({
    padding: '10px',
    textAlign: 'center',
    borderTop: '.5px solid white',
    color: 'white!important'
  }))

export default function Navbar () {
    const [isOpen, setIsOpen] = useState(false)
    const {theme} = useContext(ThemeContext)

    return (
        <div
            className={
                cx(
                    "",
                    css`
                    background: ${theme.background}!important;
                    color: white;
                    overflow: hidden;
                    border-bottom: .2px solid rgba(255,255,255,.4);
                    `
                )
            }
        >
            
            <div
                className={
                    cx(
                        "ui menu inverted",
                        css`
                        display: flex;
                        padding: 0px 10px 0px;
                        margin: 0px!important;
                        background: ${theme.background}!important;
                        height: 68px;
                        
                        flex-direction: row;
                        justify-content: space-between;
                        position: relative;
                        `
                    )
                }
            >
                <div
                    className={
                        css`
                        height: 30px;
                        `
                    }
                >
                    <img
                        alt="logo"
                        className={
                            css`
                            width: 130px;
                            position: absolute;
                            top: 50%;
                            left: 30px;
                            transform: translate(0%, -50%);
                            
                            `
                        }
                        src={logo}
                    />
                </div>
                <div className={
                    cx(
                        "right menu",
                        css`
                        height: 68px;
                        @media (max-width: 768px) {
                            display: none!important;
                        }
                        `
                    )
                }>
                    <Link to='/'
                        className={
                            cx(
                                'item',
                                css`
                                font-size: 24px;
                                `
                            )
                        }
                    >Pokemon World</Link>
                    <Link to='/collection'
                        className={
                            cx(
                                'item',
                                css`
                                font-size: 24px;
                                `
                            )
                        }
                    >Collection</Link>
                </div>
                <i
                    className={
                        cx(
                            isOpen ? "window close outline icon" : "list alternate icon",
                            css`
                            font-size: 33px!important;
                            vertical-align: 20px;
                            position: absolute;
                            top: 60%;
                            right: 10px;
                            transform: translate(0%, -50%);
                            display: none!important;
                            @media (max-width: 768px) {
                                display: inline-block!important;
                            }
                            `
                        )
                    }
                    onClick={()=>{setIsOpen(!isOpen)}}
                ></i>
            </div>
            

            <div
                className={
                    css`
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    position: relative;
                    height: ${isOpen ? '80px' : '0px'};
                    transition: all .4s ease;
                    display: none;
                    @media (max-width: 768px) {
                        display: block;
                    }
                    `
                }
            >
                <div
                    className={
                        css`
                        width: 100%;
                        top: 0;
                        `
                    }
                >
                    <Link
                        onClick={()=>{setIsOpen(!isOpen)}}
                        to='/'>
                        <List>
                            Home
                        </List>
                    </Link>
                    <Link
                        onClick={()=>{setIsOpen(!isOpen)}}
                        to='/collection'>
                        <List>
                            Collection
                        </List>
                    </Link>
                </div>
            </div>
        </div>
    )
}