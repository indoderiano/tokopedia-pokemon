import React from 'react'
import {css} from '@emotion/css'

export default function Loading () {
    return (
        <div
            className={
                css`
                    width: 120px;
                    height: 120px;
                    margin: auto;
                    position: relative;
                    overflow: hidden;
                `
            }
        >
            <img
                className={
                    css`
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    `
                }
                width='240%'
                src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'/>           
        </div>
    )
}