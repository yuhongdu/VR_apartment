import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton
} from 'react-vr';
import PropTypes from 'prop-types'


//import buttons
import RoomButton from './components/RoomButton';
import FurniButton from './components/FurniButton';


//import router
import Router from 'react-router/MemoryRouter';
import { Redirect, Route } from 'react-router'


import CylindricalPanel from 'CylindricalPanel';

const MAX_TEXTURE_WIDTH = 4096;
const MAX_TEXTURE_HEIGHT = 1000;

//convert for rotation
const degreesToPixels = degrees => (degrees / 360) * MAX_TEXTURE_WIDTH
//convert for movement
const PPM = 1/(2 * Math.PI * 3) * MAX_TEXTURE_WIDTH;

export default class Final_Project extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: null,
        locationId: null,
        rotation: null,
      };
    }

// fetch data, should be changed into api call
    componentDidMount(){
        const source = this.props.file
        console.log(source)
        fetch(asset(source).uri)
          .then(response => response.json())
          .then(responseData => {
            this.init(responseData);
          })
          .done();
    }

    init(data){
        this.setState({
            data:data,
            locationId:data.firstSpot,
            rotation:data.firstSpotRotation
        })

    }

    changeColor(newdata){
        console.log("werwe")
        this.setState({locationId: newdata})
    }

    render(){
        if(!this.state.data){
            return null;
        }

        const locationId = this.state.locationId;
        const panoPhoto = this.state.data.photos[locationId];
        const surroundings = (panoPhoto && panoPhoto.surroundings) || null;
        const rotation =  this.state.rotation + panoPhoto.rotationOffset;

        return(

            <View style={{transform: [{rotateY:0}]}}>
                <Pano
                    source = {asset(this.state.data.photos[locationId].uri)} />
                <CylindricalPanel
                    layer = {{
                        width: MAX_TEXTURE_WIDTH,
                        height: MAX_TEXTURE_HEIGHT,
                        density: MAX_TEXTURE_WIDTH,
                        radius: 3,
                    }}
                    style = {{position: 'absolute'}}>
                    <View
                        style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            width:MAX_TEXTURE_WIDTH,
                            height:MAX_TEXTURE_HEIGHT,
                        }}>

                        <View>
                        {surroundings &&
                        surroundings.map((surrounding, index)=>{
                            if(!surrounding.type){
                                return(
                                    <RoomButton
                                        key = {surrounding.PhotoId}
                                        onClike = {()=>{
                                            this.setState({
                                                locationId:surrounding.PhotoId
                                            })
                                            console.log(locationId)
                                        }}
                                        to = {'/{surrounding.PhotoId}'}
                                        pixelsPerMeter = {PPM}
                                        text = {surrounding.text}
                                        factor = {surrounding.factor}
                                        translateX = {degreesToPixels(surrounding.rotationY)}
                                        translateZ = {degreesToPixels(surrounding.rotationZ)}
                                    />
                                )
                            }else{
                                return(
                                    <FurniButton
                                        key = {surrounding.title}
                                        pixelsPerMeter = {PPM}
                                        color = {surrounding.color}
                                        title = {surrounding.title}
                                        uri = {surrounding.uri}
                                        text = {surrounding.text}
                                        changeColor = {this.changeColor.bind(this)}
                                        translateX = {degreesToPixels(surrounding.rotationY)}
                                        translateZ = {degreesToPixels(surrounding.rotationZ)} />
                                )
                            }
                        })}
                        </View>
                        </View>

                </CylindricalPanel>
            </View>

        )
    }

};

AppRegistry.registerComponent('Final_Project', () => Final_Project);
