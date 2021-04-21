import { css, cx } from '@emotion/css'
import styled from '@emotion/styled'
import React, { useState } from 'react'
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

    return (
        <div
            className={
                css`
                background: rgba(24,27,29);
                color: white;
                overflow: hidden;
                `
            }
        >
            {/* Mobile View */}
            <div
                className={
                    css`
                    display: none;
                    @media (max-width: 768px) {
                        display: flex;
                    }
                    padding: 25px 10px 10px;
                    
                    flex-direction: row;
                    justify-content: space-between
                    `
                }
            >
                <div
                    className={
                        css`
                        height: 30px;
                        position: relative;
                        `
                    }
                >
                    <img
                        className={
                            css`
                            height: 300%;
                            position: absolute;
                            top: 30%;
                            left: 10px;
                            transform: translate(0%, -50%);
                            
                            `
                        }
                        src={logo}
                    />
                </div>
                <i
                    className={
                        cx(
                            isOpen ? "window close outline icon" : "list alternate icon",
                            css`
                            font-size: 33px!important;
                            vertical-align: 20px;
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