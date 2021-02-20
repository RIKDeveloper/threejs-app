import React, {Suspense} from 'react'
import {Canvas} from "react-three-fiber"
import {OrbitControls, Stars} from "@react-three/drei"
import SpaceObject from '../SpaceObject/SpaceObject'

export default (props)=>{
    return (
        <Canvas
            concurrent
            colorManagement
            height={800}
            camera={{position: [0,0,250], fov: 70, far: 10000}}
        >
            <ambientLight intensity={0.25} color={0xCCCCCC}/>
            <SpaceObject/>
            <Stars
                radius={1000}
                depth={50}
                count={5000}
                factor={7}
                saturation={0}
                />
            <OrbitControls maxDistance={1800} minDistance={120}/>
        </Canvas>

    )
}