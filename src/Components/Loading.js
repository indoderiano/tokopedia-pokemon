import React from 'react'
import {css} from '@emotion/css'
import pokeball from '../images/pokeball-loading.gif'

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
                alt="loading"
                className={
                    css`
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    `
                }
                width='240%'
                src={pokeball}/>           
        </div>
    )
}