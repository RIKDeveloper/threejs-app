import React, {useRef} from 'react'
import { useFrame } from 'react-three-fiber'
import Model3D from "../Model3D/Model3D"
import { Sphere } from "@react-three/drei"
export default (props)=>{
    const options = {
        O: {limit:props.limitTimeOrbit||365000, indent: props.indent||'0', center:props.centerO||{x:0, y:0, z:0}},
        R: {limit:props.limitTimeRotation||1000}
    }

    let childrenOptions = [],
        light = null,
        children = null

    if(props.children){
        children = []
        if(Array.isArray(props.children)){
            for (let item of props.children){
                childrenOptions.push({
                    O: {limit:item.props.limitTimeOrbit||365000, indent: item.props.indent||'0'},
                    R: {limit:item.props.limitTimeRotation||1000}
                })
                children.push(<mesh>{item}</mesh>)
            }
        } else{
            childrenOptions.push({
                O: {limit:props.children.props.limitTimeOrbit||365000, indent: props.children.props.indent||'0'},
                R: {limit:props.children.props.limitTimeRotation||1000}
            })
            children.push(<mesh>{props.children}</mesh>)
        }
    }

    const ref = useRef();

    useFrame(()=>{
        const nowTime = new Date().getTime()

        if(!props.stop){
            ref.current.position.z = +options.O.indent * Math.cos((2 * Math.PI) / options.O.limit * nowTime) + options.O.center.z
            ref.current.position.x = +options.O.indent * Math.sin((2 * Math.PI) / options.O.limit * nowTime) + options.O.center.x
        }
    })

    if(props.light){
        light = (<pointLight
            color={0xffcf48}
            intensity={10}
            distance={2500}
            position={[0,20,0]}/>)
    }

    return(
        <group
            position={props.position}>
            <mesh
                onClick={props.onClick}
                ref={ref}
                name={props.name}>
                <Model3D
                    scale={props.scale}
                    url={props.url}/>
                {light}
                <Sphere radius={40} args={[20,20,20]} position={props.positionSphere}>
                    <meshBasicMaterial attach='material' transparent opacity={0}/>
                </Sphere>
            </mesh>
            {children}


        </group>
    )
}