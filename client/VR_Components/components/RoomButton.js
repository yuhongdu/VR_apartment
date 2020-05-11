import React from 'react';
import {Animated, Image, Text, View, VrButton} from 'react-vr';
import PropTypes from 'prop-types'

const Easing = require('Easing')

export default class RoomButton extends React.Component {


    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this)
        this.state = {
            //gazed to check whether mouse hover
            gazed: 0,
            //tranY for animation
            transY: new Animated.Value(0)
        }
    }

    handleClick(){
        //console.log(this.context)
        this.props.onClike()
        //this.context.router.history.push(this.props.to)
    }

    handleEnter(){
        this.setState({gazed: 1})
    }

    handleExit(){
        this.setState({gazed: 0})
    }

//handle animation
    handleAni(){
        const PPM = this.props.pixelsPerMeter;
        const factor = this.props.factor;
        const Pactor = PPM * factor

        Animated.timing(
            this.state.transY,
            {
                toValue: 0.1 * Pactor,
                easing:Easing.bounce
            }
        ).start();
    }

    endAni(){
        this.state.transY.stopAnimation();
        this.state.transY.setValue(0);
    }

    render(){
        const PPM = this.props.pixelsPerMeter;
        const factor = this.props.factor;
        const Pactor = PPM * factor

        return(
            <VrButton
                style = {{
                    flexDirection:'row',
                    layoutOrigin:[0.5,0.5],
                    alignItems:'center',
                    position:'absolute',
                    transform:[
                        {translateX: this.props.translateX},
                        {translateY: this.props.translateZ}
                    ]
                }}
                onClick = {() => {this.handleClick()}}
                onEnter = {this.handleEnter.bind(this)}
                onExit = {this.handleExit.bind(this)}>
                <Animated.View
                    style = {{
                        alignItems:'center',
                        justifyContent: 'center',
                        backgroundColor:'rgba(0,0,0,0)',
                        transform:[
                            {translateY: this.state.transY}
                        ]
                    }}
                    onEnter = {this.handleAni.bind(this)}
                    onExit = {this.endAni.bind(this)}>
                    <Image
                        style = {{
                            height: 0.7 * Pactor,
                            width: 0.35 * Pactor,
                            transform: [
                                {translateY: 0.15 * Pactor}
                            ]
                        }}
                        source = {{uri:"../static_assets/icon.png"}}/>
                </Animated.View>
                <Text
                    style = {{
                        backgroundColor:'rgba(0,0,0,0)',
                        color:'white',
                        fontSize:30 * factor,
                        fontWeight:"800",
                        padding: 0.1 * Pactor ,
                        textAlign:'center',
                        textAlignVertical:'auto',
                        marginLeft: 0 * Pactor,
                        opacity: this.state.gazed
                    }}>
                    {this.props.text}
                </Text>

            </VrButton>
        )
    }

}
