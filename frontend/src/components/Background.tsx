import React from 'react'
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Container, Engine } from 'tsparticles-engine';

const Background = () => {

    // const particlesInit = useCallback(async (engine: Engine) => {
    //     console.log(engine);
    //     await loadFull(engine);
    // }, []);

    // const particlesLoaded = useCallback(async (container: Container | undefined) => {
    //     await console.log(container);
    // }, []);

    return (
        <div className='fixed w-screen h-screen flex flex-col justify-center top-0 left-0 z-0 background-container'>

            {/* <!-- Particles --> */}
            {/* <div className='fixed top-0 left-0 z-10'>
                <Particles id="particles-1" init={particlesInit} loaded={particlesLoaded} options={{
                    background: {
                        color: {
                            value: "#0d47a1",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }} />
            </div> */}

            {/* <!-- Blob layer - Back --> */}
            <svg className="blob back" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#EE5A51"
                    d="M44.3,-62C56.7,-51.9,65.8,-38.1,68.9,-23.5C72.1,-9,69.4,6.3,65.8,22.6C62.1,38.8,57.6,55.9,46.5,64.1C35.4,72.3,17.7,71.5,-0.5,72.2C-18.7,72.9,-37.5,75.1,-50.1,67.5C-62.6,59.8,-69,42.1,-71.3,25.5C-73.6,8.8,-71.7,-6.9,-66,-20.5C-60.3,-34.1,-50.9,-45.6,-39.3,-56C-27.6,-66.4,-13.8,-75.8,1,-77.3C15.9,-78.7,31.8,-72.2,44.3,-62Z"
                    transform="translate(80 45) scale(0.6)" />
            </svg>

            <svg className="blob back" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#147BEA"
                    d="M37.3,-44.5C46,-28.6,49.1,-14.3,50,0.9C50.9,16.1,49.6,32.2,40.9,47.2C32.2,62.1,16.1,76,2.7,73.3C-10.7,70.5,-21.3,51.2,-33.8,36.3C-46.3,21.3,-60.7,10.7,-63.2,-2.5C-65.7,-15.7,-56.4,-31.4,-43.9,-47.2C-31.4,-63.1,-15.7,-79.2,-0.7,-78.5C14.3,-77.8,28.6,-60.3,37.3,-44.5Z"
                    transform="translate(130 80) scale(0.4) rotate(140)" />
            </svg>

            {/* <!-- Blob layer - Middle --> */}

            {/* <!-- Particles --> */}
            <div id="particles-2"></div>

            {/* <!-- Blob layer - Front --> */}
            <svg className="blob front" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#EB8884"
                    d="M70.5,-22.3C80,6.3,68.4,42.3,44.4,59.2C20.4,76.2,-16,74.2,-41.1,56.1C-66.2,37.9,-80,3.7,-71.2,-23.8C-62.5,-51.4,-31.3,-72.3,-0.4,-72.1C30.5,-72,61,-50.9,70.5,-22.3Z"
                    transform="translate(40 20) scale(0.12)" />
            </svg>

            <svg className="blob front" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#8CB5E0"
                    d="M64.4,-21.4C73,5.6,62.4,38.4,39.2,55.5C16.1,72.7,-19.5,74.3,-43.2,57.5C-66.9,40.7,-78.8,5.6,-69.6,-22.1C-60.4,-49.8,-30.2,-70.2,-1.1,-69.8C27.9,-69.4,55.8,-48.3,64.4,-21.4Z"
                    transform="translate(140 70) scale(0.15)" />
            </svg>

        </div>
    )
}

export default Background