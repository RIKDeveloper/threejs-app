import React, {Suspense} from 'react'
import {Canvas} from "react-three-fiber"
import {OrbitControls, Stars} from "@react-three/drei"
import SpaceObject from '../SpaceObject/SpaceObject'
import Model3D from "../Model3D/Model3D"

export default (props)=>{
    return (
        <Canvas
            concurrent
            colorManagement
            height={800}
            camera={{position: [0,0,250], fov: 70, far: 10000}}
        >
            <ambientLight intensity={0.25} color={0xCCCCCC}/>
            <Suspense fallback={null}>
                <SpaceObject
                    url='/models/sun.gltf'
                    limitTimeRotation={27000}
                    limitTimeOrbit={365256}
                    indent={10}
                    position={[0, -20, 0]}
                    positionSphere={[0,20,0]}
                    light
                    name={'Солнце'}
                />
                <SpaceObject
                    url='/models/mercury.gltf'
                    limitTimeRotation={58650}
                    limitTimeOrbit={87970}
                    indent={200}
                    name={'Меркурий'}
                />
                <SpaceObject
                    url='/models/venus.gltf'
                    limitTimeRotation={243021}
                    limitTimeOrbit={224700}
                    indent={318}
                    name={'Венера'}
                />
                <SpaceObject
                    url='/models/myEarth.gltf'
                    limitTimeRotation={1000}
                    limitTimeOrbit={365000}
                    indent={394}
                    name={'Земля'}
                >
                    <Model3D
                        url='/models/Moon.gltf'
                        limitTimeOrbit={27322}
                        indent={1.8}
                        limitTimeRotation={27000}/>
                </SpaceObject>
                <SpaceObject
                    url='/models/mars.gltf'
                    limitTimeRotation={1000}
                    limitTimeOrbit={686980}
                    indent={570}
                    name={'Марс'}
                />
                <Stars
                    radius={1000}
                    depth={100}
                    count={3000}
                    factor={7}
                    />
                <OrbitControls maxDistance={1800} minDistance={120}/>
            </Suspense>
        </Canvas>

    )
}